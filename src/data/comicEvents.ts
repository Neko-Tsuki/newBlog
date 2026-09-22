// 漫展数据源
// 对应规格文档 §4.2
//
// 与规格的差异：
// 1. 规格把 status 硬编码在每条数据上，这里改为在模块初始化时用
//    computeStatus() 推导。今日（数据均为过去活动）渲染输出与规格完全一致，
//    但状态不会随时间失真。
// 2. 规格的 cover 指向 upload.codexing.top，但那批图片实际返回 404。
//    现改为本地空白占位图（public/assets/images/comic-events/<id>.webp，1280x720 灰底）。
//    换成真图时直接覆盖同名文件即可，无需改代码。
// 3. 新增构建期数据校验与补齐（见 validateAndNormalize）。

import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ComicEvent, ComicEventStatus } from "@/types/comic";

// 录入时允许省略 arriveDate / tags，由 validateAndNormalize 补齐
type RawComicEvent = Omit<ComicEvent, "status" | "arriveDate" | "tags"> & {
	arriveDate?: string;
	tags?: string[];
};

// 状态计算工具（根据当前时间动态推导）
// 只依赖日期字段，因此形参放宽为 Pick，便于在补 status 之前调用
export function computeStatus(
	event: Pick<ComicEvent, "startDate" | "endDate">,
	now: Date = new Date(),
): ComicEventStatus {
	const start = new Date(event.startDate);
	const end = new Date(event.endDate);
	if (now < start) return "upcoming";
	if (now > end) return "ended";
	return "ongoing";
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 构建期校验与补齐。
 * 校验结果通过 console.warn 输出到构建终端（模块只求值一次，不会重复刷屏）。
 * 可推断的字段自动补齐，无法推断的只报告不猜测。
 */
function validateAndNormalize(
	raw: RawComicEvent[],
): Omit<ComicEvent, "status">[] {
	const seenIds = new Set<string>();
	const problems: string[] = [];

	const normalized = raw.map((e, i) => {
		const where = `comicEvents[${i}] id="${e.id || "?"}"`;

		// ---- 必填项 ----
		if (!e.id) problems.push(`${where}: 缺少 id`);
		else if (seenIds.has(e.id)) problems.push(`${where}: id 重复`);
		else seenIds.add(e.id);

		if (!e.title) problems.push(`${where}: 缺少 title`);
		if (!e.city)
			problems.push(`${where}: 缺少 city —— 该条不会出现在任何城市筛选下`);
		if (!e.venue) problems.push(`${where}: 缺少 venue`);

		// ---- 日期格式 ----
		if (!DATE_RE.test(e.startDate))
			problems.push(
				`${where}: startDate 应为 YYYY-MM-DD，实际 "${e.startDate}"`,
			);
		if (!DATE_RE.test(e.endDate))
			problems.push(`${where}: endDate 应为 YYYY-MM-DD，实际 "${e.endDate}"`);
		if (
			DATE_RE.test(e.startDate) &&
			DATE_RE.test(e.endDate) &&
			e.endDate < e.startDate
		)
			problems.push(`${where}: endDate 早于 startDate`);

		// ---- 票务 ----
		if (!e.tickets || e.tickets.length === 0)
			problems.push(`${where}: 缺少 tickets —— 卡片票价会显示为空`);

		// ---- 封面文件是否存在（能提前发现 404）----
		if (!e.cover) {
			problems.push(`${where}: 缺少 cover`);
		} else if (e.cover.startsWith("/")) {
			const abs = join(process.cwd(), "public", e.cover);
			if (!existsSync(abs))
				problems.push(`${where}: 封面文件不存在 —— public${e.cover}`);
		}

		// ---- 补齐可推断的默认值 ----
		return {
			...e,
			arriveDate: e.arriveDate || e.startDate,
			tags: e.tags ?? [],
		};
	});

	if (problems.length > 0) {
		console.warn(
			`\n[comicEvents] 喵！数据里发现 ${problems.length} 处不太对劲的地方 (´・ω・)\n`,
		);
		for (const p of problems) console.warn(`  · ${p}`);
		console.warn(
			"\n[comicEvents] 去 src/data/comicEvents.ts 瞅一眼吧，把这些改掉喵就不闹了～\n",
		);
	}

	return normalized;
}

// 原始数据（不含 status，由下方统一推导）
const rawComicEvents: RawComicEvent[] = [
	{
		id: "summer-star-torch",
		title: "夏日星炬·学院回响",
		cover: "/assets/images/comic-events/summer-star-torch.webp",
		startDate: "2026-08-15",
		endDate: "2026-08-15",
		arriveDate: "2026-08-15",
		city: "杭州",
		venue: "杭州大厦中央商城Zpark街区",
		note: "已经过去 {days} 天了！夏天的余温早凉透了，咱的青春也跟着一起溜走了喵……",
		tickets: [
			{ name: "普票", price: 78 },
			{ name: "vip票", price: 128 },
		],
	},
	{
		id: "wuthering-waves-tour",
		title: "鸣潮·巡回演唱会",
		cover: "/assets/images/comic-events/wuthering-waves-tour.webp",
		startDate: "2026-07-16",
		endDate: "2026-07-18",
		arriveDate: "2026-07-18",
		city: "上海",
		venue: "浦发银行东方体育中心",
		note: "已经过去 {days} 天了！耳朵里的余音绕了整整 {days} 天还没散，这合理吗！",
		tickets: [
			{ name: "S档", price: 1280 },
			{ name: "A档", price: 1180 },
			{ name: "B档", price: 880 },
		],
	},
	{
		id: "k-on-only-3",
		title: "上海·轻音少女ONLY3.0",
		cover: "/assets/images/comic-events/k-on-only-3.webp",
		startDate: "2026-07-12",
		endDate: "2026-07-12",
		arriveDate: "2026-07-12",
		city: "上海",
		venue: "交运智慧湾科创园25号楼",
		note: "已经过去 {days} 天了！放課後のティータイム早就散场啦，梓喵都等困了喵……",
		tickets: [
			{ name: "普票", price: 88 },
			{ name: "vip票", price: 138 },
		],
	},
	{
		id: "bilibili-world-2026",
		title: "Bilibili World 2026",
		cover: "/assets/images/comic-events/bilibili-world-2026.webp",
		startDate: "2026-07-11",
		endDate: "2026-07-13",
		arriveDate: "2026-07-12",
		city: "上海",
		venue: "国家会展中心",
		note: "已经过去 {days} 天了！腿到现在还在酸，钱包到现在还在哭，人却已经开始期待下一届了！",
		tickets: [
			{ name: "单日票", price: 128 },
			{ name: "三日票", price: 328 },
		],
	},
	{
		id: "cicaf-22",
		title: "第二十二届中国国际动漫节",
		cover: "/assets/images/comic-events/cicaf-22.webp",
		startDate: "2026-06-20",
		endDate: "2026-06-23",
		arriveDate: "2026-06-21",
		city: "杭州",
		venue: "杭州国际博览中心",
		note: "已经过去 {days} 天了！三个多月的时光说没就没，本喵的记性和钱包一起蒸发了喵！",
		tickets: [{ name: "单日票", price: 100 }],
	},
	{
		id: "comicup-32",
		title: "COMIC UP 32",
		cover: "/assets/images/comic-events/comicup-32.webp",
		startDate: "2025-05-01",
		endDate: "2025-05-05",
		arriveDate: "2025-05-02",
		city: "杭州",
		venue: "杭州大会展中心",
		note: "已经过去 {days} 天了！一年半载就这么过去了，那天的记忆都快包浆了喵……",
		tickets: [{ name: "单日票", price: 60 }],
	},
];

export const comicEvents: ComicEvent[] = validateAndNormalize(
	rawComicEvents,
).map((event) => ({
	...event,
	status: computeStatus(event),
}));

// 派生统计（随 comicEvents 自动更新，无需手动维护）
export const comicStats: Record<ComicEventStatus | "all", number> = {
	all: comicEvents.length,
	upcoming: comicEvents.filter((e) => e.status === "upcoming").length,
	ongoing: comicEvents.filter((e) => e.status === "ongoing").length,
	ended: comicEvents.filter((e) => e.status === "ended").length,
};

// 城市筛选项（从数据自动去重汇总）
export const comicCities: string[] = Array.from(
	new Set(comicEvents.map((e) => e.city)),
);

// 标签（从数据自动去重汇总，供后续扩展标签筛选使用）
export const comicTags: string[] = Array.from(
	new Set(comicEvents.flatMap((e) => e.tags ?? [])),
);

/** 按状态筛选，供页面分区渲染使用 */
export function eventsByStatus(status: ComicEventStatus): ComicEvent[] {
	return comicEvents.filter((e) => e.status === status);
}

// 距离最近一场活动的天数（正数为未来，负数为过去）
export function daysToNearestEvent(
	now: Date = new Date(),
): { event: ComicEvent; days: number } | null {
	if (comicEvents.length === 0) return null;
	const sorted = [...comicEvents].sort(
		(a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
	);
	let nearest = sorted[0];
	let minDiff = Number.POSITIVE_INFINITY;
	for (const ev of sorted) {
		const diff = Math.round(
			(new Date(ev.startDate).getTime() - now.getTime()) / 86400000,
		);
		if (Math.abs(diff) < Math.abs(minDiff)) {
			minDiff = diff;
			nearest = ev;
		}
	}
	return { event: nearest, days: minDiff };
}
