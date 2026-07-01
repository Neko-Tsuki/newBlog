import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "咱的小Baka朋友",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "除了咱都是BAKA！",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 99, // 权重，数字越大排序越靠前
		enabled: false, // 是否启用
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 99,
		enabled: true,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 99,
		enabled: true,
	},
	{
		title: "东方行状录",
		imgurl: "https://img.shika-mori.top/picGO/%E7%A4%BE%E5%9B%A2logo.png",
		desc: "由咱参与的东方Project同人刊物",
		siteurl: "https://www.touhouchronicle.com/",
		tags: ["同人刊物"],
		weight: 29,
		enabled: true,
	},
	{
		title: "PiCpo的阁楼",
		imgurl:
			"https://avatars.githubusercontent.com/u/33993624?s=400&u=fef5f5d3d0e117d28c6a6addf608d1f8ef741cdc&v=4",
		desc: "Computer Science & Security Learner",
		siteurl: "https://picpo.top",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "寒寒",
		imgurl: "https://alikia2x.com/img/avatar.png",
		desc: "技术菜菜，梦想大大",
		siteurl: "https://blog.alikia2x.com",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "日向花和",
		imgurl: "https://hanawa.me/assets/img/avatar.jpg",
		desc: "你好，我是饼饼",
		siteurl: "https://blog.hanawa.me",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "Fika",
		imgurl: "https://pic.imgdb.cn/item/637c14ee16f2c2beb161a26e.jpg",
		desc: "遇到困难睡大觉",
		siteurl: "https://fika.ink/",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "SayoLab",
		imgurl: "https://sayolab.uk:1500/favicon.ico",
		desc: "欲得之物甚多，却终不可得之",
		siteurl: "https://sayolab.uk:1500",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "XYenon",
		imgurl: "https://blog.xyenon.bid/images/favicon.png",
		desc: "",
		siteurl: "https://blog.xyenon.bid/",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "小意_rsesot",
		imgurl: "https://rsesot.cn/files/site/avatar.png",
		desc: "",
		siteurl: "https://rsesot.cn/",
		tags: ["喵友"],
		weight: 29,
		enabled: true,
	},
	{
		title: "猫咪流浪记",
		imgurl: "https://jihulab.com/spss/cdn/-/raw/master/img/avatar.jpg",
		desc: "在虚无的幻想里漂流",
		siteurl: "https://mtf.org.uk/",
		tags: ["喵友"],
		weight: 29,
		enabled: true
	},
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
