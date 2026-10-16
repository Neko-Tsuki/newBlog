// 漫展数据源 —— 只放活动条目本身，加/改活动改这里就行
//
// 状态推导、构建期校验补齐、派生统计与筛选器都在 @/utils/comic-utils。
// 这里不要写 status：它由 computeStatus() 按日期与当前时间推导，手写会随日期失真。
//
// 封面图：public/assets/images/comic-events/<id>.webp，换真图直接覆盖同名文件即可，
// 无需改代码；构建时若文件不存在会在终端报警（见 comic-utils 的 validateAndNormalize）。

import type { ComicEvent } from "@/types/comic";

// 录入时允许省略 arriveDate / tags，由 comic-utils 的校验补齐
export type RawComicEvent = Omit<
	ComicEvent,
	"status" | "arriveDate" | "tags"
> & {
	arriveDate?: string;
	tags?: string[];
};

export const rawComicEvents: RawComicEvent[] = [
	{
		id: "wuhan-tho10",
		title: "武汉THO - 东方绯红月",
		cover: "/assets/images/comic-events/wuhan-tho10.webp",
		startDate: "2026-10-06",
		endDate: "2026-10-06",
		arriveDate: "2026-10-06",
		city: "武汉",
		venue: "湖北武汉客厅",
		// 未结束时显示
		noteUpcoming: "还有 {days} 天！绯红月就要升起来啦，咱的行头还没翻出来喵……",
		// 结束后显示
		noteEnded:
			"已经过去 {days} 天了！绯红月的余韵还在脑子里打转，没抢到特典这事咱能记一年喵……",
		tickets: [
			{ name: "普票", price: 75 },
			{ name: "特典票", price: 150 },
		],
	},
];
