// 漫展日程的派生逻辑
//
// 数据本身在 @/data/comicEvents（那里只放活动条目，录入时改那个文件就行），
// 这里负责把它加工成页面能直接用的东西：
//   状态推导（computeStatus）→ 构建期校验补齐（validateAndNormalize）
//   → 派生统计与筛选器（comicEvents / comicStats / comicCities / comicTags）
//
// 数据文件一改，下面这些导出会自动跟着更新，无需手动同步。

import { existsSync } from "node:fs";
import { join } from "node:path";
import { type RawComicEvent, rawComicEvents } from "@/data/comicEvents";
import type { ComicEvent, ComicEventStatus } from "@/types/comic";

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

// 校验补齐 + 补上推导出的 status
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
