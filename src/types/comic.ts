// 漫展日程（Comic Events）类型定义
// 对应规格文档 §4.1

export type ComicEventStatus = "upcoming" | "ongoing" | "ended";

export interface ComicTicketTier {
	name: string; // "普票" | "vip票" | "S档" | "A档" | "B档"
	price: number; // 元
}

export interface ComicEvent {
	id: string; // 唯一标识
	title: string; // "夏日星炬·学院回响"
	cover: string; // 封面图 URL
	startDate: string; // "2026-08-15"
	endDate: string; // "2026-08-15"
	arriveDate: string; // "2026-08-15" 赴约日期
	city: string; // "杭州" | "上海"
	venue: string; // "杭州大厦中央商城Zpark街区"
	tickets: ComicTicketTier[];
	status: ComicEventStatus;
	description?: string;
	tags?: string[];
	/**
	 * 侧边栏「最近漫展」的专属文案。
	 * 支持 {days} 占位符，会被替换成距离开展的天数（绝对值）。
	 * 留空则回退到组件内置的通用文案。
	 */
	note?: string;
}

export interface ComicFilterState {
	status: "all" | ComicEventStatus;
	city: "all" | string;
}
