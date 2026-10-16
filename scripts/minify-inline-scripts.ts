// 内联脚本压缩构建后脚本
// Astro 只压缩打包后的 script，is:inline 一律原样输出（连注释和缩进都在）。
// 这里在 astro build 之后扫一遍 dist/ 的 HTML，把内联 JS 过一遍 esbuild。

import fs from "node:fs/promises";
import { transformSync } from "esbuild";
import { glob } from "glob";
import { resolveSiteRoot } from "./site-root";

// Cloudflare Pages 上产物在 dist/client，本地在 dist，统一对准真实根目录
const DIST_DIR = resolveSiteRoot();

// <script ...>...</script> 不能直接对整份 HTML 跑正则：
// Expressive Code 的复制按钮会把代码原文塞进 data-code 属性，文章里示例写的
// <script lang="ts">…</script> 就整段躺在属性值里。正则会把属性值里的 <script
// 当成标签起点，一路吃到属性值里那个 </script>，结果这段匹配既过不了 esbuild
// （属性值里的换行是 \x7f 占位符），又可能把后面的正文卷进匹配范围。
//
// 所以按 HTML 的解析规则扫一遍，只在「标签之外」认 <script：
//   · 注释 <!-- --> 整段跳过 —— 里面的撇号（"can't"）不是属性引号，
//     当成引号会把后面几十 KB 全吞掉，真脚本就漏压了
//   · 属性值里的引号成对跳过，值里的 > 不算标签结束
//   · <style>/<textarea>/<title> 的正文是纯文本，跳到对应结束标签
interface ScriptTag {
	start: number; // '<' 的下标
	end: number; // '</script>' 之后的下标
	attrs: string; // 'script' 之后到 '>' 之前，含前导空格
	body: string;
}

// 正文按纯文本处理的元素，里面的 < 和引号都没有标签含义
const RAW_TEXT_TAGS = new Set(["style", "textarea", "title"]);

/** 找 `</name`，大小写不敏感。不用 toLowerCase() 造副本：个别字符小写化会改变长度，下标会错位 */
function indexOfCloseTag(html: string, name: string, from: number): number {
	const re = new RegExp(`</${name}`, "gi");
	re.lastIndex = from;
	const m = re.exec(html);
	return m ? m.index : -1;
}

function findScriptTags(html: string): ScriptTag[] {
	const tags: ScriptTag[] = [];
	let i = 0;

	while (i < html.length) {
		const lt = html.indexOf("<", i);
		if (lt === -1) break;

		// 注释整段跳过
		if (html.startsWith("<!--", lt)) {
			const end = html.indexOf("-->", lt + 4);
			i = end === -1 ? html.length : end + 3;
			continue;
		}

		// <!doctype ...> 之类，直接扫到 '>'
		if (html[lt + 1] === "!") {
			const end = html.indexOf(">", lt);
			i = end === -1 ? html.length : end + 1;
			continue;
		}

		// 扫到标签的 '>'：属性值里的引号要成对跳过，属性值里的 '>' 不算标签结束
		let j = lt + 1;
		let quote = "";
		for (; j < html.length; j++) {
			const c = html[j];
			if (quote) {
				if (c === quote) quote = "";
			} else if (c === '"' || c === "'") {
				quote = c;
			} else if (c === ">") {
				break;
			}
		}
		if (j >= html.length) break; // 没有闭合的 '>'，后面的都不当成标签

		const head = html.slice(lt + 1, j);
		const name = /^([a-zA-Z][a-zA-Z0-9-]*)/.exec(head)?.[1].toLowerCase() ?? "";
		const selfClosing = head.endsWith("/");

		if (name === "script") {
			const attrs = head.slice("script".length);
			if (selfClosing) {
				// 自闭合，没有内容
				tags.push({ start: lt, end: j + 1, attrs, body: "" });
				i = j + 1;
				continue;
			}

			const closeLt = indexOfCloseTag(html, "script", j + 1);
			if (closeLt === -1) break;
			const closeGt = html.indexOf(">", closeLt);
			if (closeGt === -1) break;

			tags.push({
				start: lt,
				end: closeGt + 1,
				attrs,
				body: html.slice(j + 1, closeLt),
			});
			i = closeGt + 1;
			continue;
		}

		if (!selfClosing && RAW_TEXT_TAGS.has(name)) {
			const closeLt = indexOfCloseTag(html, name, j + 1);
			const closeGt = closeLt === -1 ? -1 : html.indexOf(">", closeLt);
			i = closeGt === -1 ? j + 1 : closeGt + 1;
			continue;
		}

		i = j + 1;
	}

	return tags;
}

// 只碰这几种 type（空 type 就是普通 JS）
const JS_TYPES = new Set([
	"",
	"text/javascript",
	"application/javascript",
	"module",
]);

/**
 * 判断某段 <script> 是否该压缩：
 * 外链的没有内容可压；type 不是 JS 的（application/ld+json、text/template、
 * Pagefind 的数据块之类）一律不碰。
 */
function shouldMinify(attrs: string): boolean {
	if (/\ssrc\s*=/i.test(attrs)) return false;
	const typeMatch = attrs.match(/\stype\s*=\s*["']?([^"'\s>]*)/i);
	const type = (typeMatch?.[1] ?? "").toLowerCase();
	return JS_TYPES.has(type);
}

function minifyInline(code: string, file: string): string {
	if (!code.trim()) return code;
	try {
		const result = transformSync(code, {
			loader: "js",
			target: "es2018",
			minifyWhitespace: true,
			minifySyntax: true,
			// 标识符不能改名：这些脚本处在全局作用域、彼此靠全局函数名互相调用
			// （如 MainGridLayout 的 setRandomSubtitle），改名会静默炸掉。
			minifyIdentifiers: false,
		});
		// 压完不能出现 </script，否则会提前闭合标签
		if (/<\/script/i.test(result.code)) return code;
		return result.code;
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		console.warn(`   ⚠ Skipped a script in ${file}: ${message}`);
		return code;
	}
}

async function main() {
	console.log("🗜 Minifying inline scripts in dist/...");

	const htmlFiles = await glob(`${DIST_DIR}/**/*.html`);
	let savedBytes = 0;
	let touchedFiles = 0;
	let scriptCount = 0;

	for (const file of htmlFiles) {
		const html = await fs.readFile(file, "utf-8");
		let fileSaved = 0;
		let output = "";
		let cursor = 0;

		for (const tag of findScriptTags(html)) {
			output += html.slice(cursor, tag.start);
			cursor = tag.end;

			const whole = html.slice(tag.start, tag.end);
			if (!shouldMinify(tag.attrs)) {
				output += whole;
				continue;
			}

			const minified = minifyInline(tag.body, file);
			if (minified === tag.body) {
				output += whole;
				continue;
			}

			scriptCount++;
			fileSaved +=
				Buffer.byteLength(tag.body, "utf-8") -
				Buffer.byteLength(minified, "utf-8");
			output += `<script${tag.attrs}>${minified}</script>`;
		}
		output += html.slice(cursor);

		if (output !== html) {
			await fs.writeFile(file, output);
			savedBytes += fileSaved;
			touchedFiles++;
		}
	}

	const savedKiB = (savedBytes / 1024).toFixed(1);
	console.log(
		`✨ Minified ${scriptCount} inline scripts in ${touchedFiles}/${htmlFiles.length} HTML files, saved ${savedKiB} KiB`,
	);
}

main().catch((err) => {
	console.error("❌ Inline script minification failed:", err);
	process.exit(1);
});
