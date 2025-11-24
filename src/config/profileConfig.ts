import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	avatar: "/assets/images/avatar.png",
	name: "Kitamori",
	bio: "Hanlo, 我是尘尘, 也是鹿",
	links: [
		{
			name: "喵窝-NyaOne",
			icon: "ph:fediverse-logo",
			url: "https://nya.one/@Hokori",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Neko-Tsuki",
		},
		{
			name: "RSS",
			icon: "mdi:rss",
			url: "/rss.xml",
		},
		{
			name: "Timeline",
			icon: "mdi:timeline",
			url: "/timeline/",
		}
	],
};
