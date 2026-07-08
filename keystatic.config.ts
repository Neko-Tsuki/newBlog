import { config, fields, collection } from "@keystatic/core";

export default config({
	storage: {
		kind: "local",
	},

	collections: {
		posts: collection({
			label: "文章",
			slugField: "title",
			path: "src/content/posts/*",
			format: { contentField: "body" },
			columns: ["title", "published", "draft"],
			entryLayout: "content",
			schema: {
				title: fields.slug({
					name: { label: "标题", validation: { isRequired: true } },
				}),
				published: fields.date({
					label: "发布日期",
					validation: { isRequired: true },
				}),
				updated: fields.date({
					label: "更新日期",
				}),
				draft: fields.checkbox({
					label: "草稿",
					defaultValue: false,
				}),
				description: fields.text({
					label: "摘要",
					multiline: true,
				}),
				image: fields.text({
					label: "封面图片路径",
					description: "输入图片路径，如 ./cover.jpg 或 /imgs/posts/xxx.jpg 或 api",
				}),
				tags: fields.array(
					fields.text({ label: "标签" }),
					{
						label: "标签",
						itemLabel: (props) => props.value || "新标签",
					},
				),
				category: fields.text({
					label: "分类",
				}),
				lang: fields.select({
					label: "文章语言",
					options: [
						{ label: "默认 (跟随站点)", value: "" },
						{ label: "简体中文", value: "zh_CN" },
						{ label: "English", value: "en" },
						{ label: "日本語", value: "ja" },
						{ label: "繁體中文", value: "zh_TW" },
						{ label: "Русский", value: "ru" },
					],
					defaultValue: "",
				}),
				pinned: fields.checkbox({
					label: "置顶",
					defaultValue: false,
				}),
				comment: fields.checkbox({
					label: "启用评论",
					defaultValue: true,
				}),
				password: fields.text({
					label: "加密密码",
					description: "设置后文章内容将被 AES 加密",
				}),
				passwordHint: fields.text({
					label: "密码提示",
				}),
				author: fields.text({
					label: "作者",
				}),
				sourceLink: fields.url({
					label: "原文链接",
				}),
				licenseName: fields.text({
					label: "许可协议名称",
				}),
				licenseUrl: fields.url({
					label: "许可协议链接",
				}),
				body: fields.markdoc({
					label: "正文",
					description: "支持 Markdown 和 MDX 语法",
					options: {
						image: {
							directory: "public/assets/images",
							publicPath: "/assets/images",
						},
					},
				}),
			},
		}),

		spec: collection({
			label: "特殊页面",
			slugField: "title",
			path: "src/content/spec/*",
			format: { contentField: "body" },
			columns: ["title"],
			entryLayout: "content",
			schema: {
				title: fields.slug({
					name: { label: "标题", validation: { isRequired: true } },
				}),
				description: fields.text({
					label: "描述",
					multiline: true,
				}),
				body: fields.markdoc({
					label: "正文",
					options: {
						image: {
							directory: "public/assets/images",
							publicPath: "/assets/images",
						},
					},
				}),
			},
		}),
	},
});