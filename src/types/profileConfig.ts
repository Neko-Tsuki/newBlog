// Profile 链接显示模式
// icon   = 仅图标：紧凑方形按钮，逐条按 links[].showName 决定是否显示名称（原版行为）
// banner = 横幅：横向宽按钮、常显名称，一行放不下自动换行
export type ProfileLinkDisplayMode = "icon" | "banner";

export type ProfileConfig = {
	avatar?: string;
	name: string;
	bio?: string;
	// 链接显示模式，仅作为默认值：显示设置面板可在运行时切换并记忆到 localStorage
	// 不填等同 "icon"，与旧配置表现一致
	linkDisplayMode?: ProfileLinkDisplayMode;
	// 生日，格式 "MM-DD"（如 "10-17"）。留空即关闭生日气球特效。
	// 判定按站点时区 siteConfig.timezone，详见 src/components/features/BalloonEffect.astro
	birthday?: string;
	links: {
		name: string;
		url: string;
		icon: string;
		// 仅图标模式下单条链接是否显示名称；横幅模式恒显示名称，此项被忽略
		showName?: boolean;
	}[];
};
