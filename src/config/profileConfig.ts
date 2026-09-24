import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.png",

	// 名字
	name: "尘尘落落格",

	// 个人签名
	bio: "恰咯~这里是尘尘！\n是一只普普通通的小透明~",

	// 链接显示模式
	// "icon"   = 仅图标：紧凑方形按钮
	// "banner" = 横幅：横向宽按钮、常显名称，一行放不下自动换行（本站当前使用）
	// 这里只是默认值，显示设置面板的「外观 → Profile 链接样式」可运行时切换
	linkDisplayMode: "banner",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName 只在「仅图标」模式下生效：true 显示图标和名称，false 只显示图标
	// 「横幅」模式下恒显示名称，showName 被忽略
	links: [
		{
			name: "NyaOne (Fediverse)",
			icon: "simple-icons:mastodon",
			url: "https://nya.one/@Tsuki",
		},
		{
			name: "GitHub",
			icon: "simple-icons:github",
			url: "https://github.com/Neko-Tsuki",
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss",
		},
	],
};
