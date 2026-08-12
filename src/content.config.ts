import { defineCollection } from "astro:content";
import type { CollectionConfig } from "astro/content/config";
import { glob } from "astro/loaders";
import { type ZodType, z } from "astro/zod";

type PostData = {
	title: string;
	published: Date;
	updated?: Date;
	draft: boolean;
	description: string;
	image: string;
	tags: string[];
	category: string | null;
	lang: string;
	pinned: boolean;
	author: string;
	sourceLink: string;
	licenseName: string;
	licenseUrl: string;
	comment: boolean;
	password: string;
	passwordHint: string;
	prevTitle: string;
	prevSlug: string;
	nextTitle: string;
	nextSlug: string;
};

type DynamicData = {
	published: Date;
	pinned: boolean;
	location: string;
};

type DiaryData = {
	published: Date;
	images: string[];
	video: string;
	location: string;
	locationUrl: string;
	mood: string;
	tags: string[];
	imageDisplay?: {
		type: "carousel" | "grid";
		autoPlay?: boolean;
		interval?: number;
		showIndicator?: boolean;
		showControls?: boolean;
	};
};

type ContentCollection<T> = CollectionConfig<
	ZodType<T>,
	ReturnType<typeof glob>
>;

const postsCollection: ContentCollection<PostData> = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		descriptionSource: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false),
		author: z.string().optional().default(""),
		sourceLink: z.string().optional().default(""),
		licenseName: z.string().optional().default(""),
		licenseUrl: z.string().optional().default(""),
		comment: z.boolean().optional().default(true),
		password: z.string().optional().default(""),
		passwordHint: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection: ContentCollection<Record<string, never>> =
	defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/spec" }),
		schema: z.object({}),
	});

const dynamicCollection: ContentCollection<DynamicData> = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/dynamic" }),
	schema: z.object({
		published: z.date(),
		pinned: z.boolean().optional().default(false),
		location: z.string().optional().default(""),
	}),
});

const diaryCollection: ContentCollection<DiaryData> = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/diary" }),
	schema: z.object({
		published: z.date(),
		images: z.array(z.string()).optional().default([]),
		video: z.string().optional().default(""),
		location: z.string().optional().default(""),
		locationUrl: z.string().optional().default(""),
		mood: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		imageDisplay: z
			.object({
				type: z.enum(["carousel", "grid"]).optional().default("grid"),
				autoPlay: z.boolean().optional().default(true),
				interval: z.number().optional().default(4000),
				showIndicator: z.boolean().optional().default(true),
				showControls: z.boolean().optional().default(true),
			})
			.optional(),
	}),
});

const ziyuanCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/ziyuan" }),
	schema: z.union([
		z.object({
			title: z.string(),
			content: z.string(),
			closable: z.boolean().optional().default(true),
			link: z
				.object({
					enable: z.boolean().optional().default(true),
					text: z.string(),
					url: z.string(),
					external: z.boolean().optional().default(false),
				})
				.optional(),
			quotes: z.undefined().optional(),
		}),
		z.object({
			title: z.string(),
			quotes: z.array(
				z.object({
					text: z.string(),
					author: z.string(),
				}),
			),
			content: z.undefined().optional(),
			closable: z.undefined().optional(),
			link: z.undefined().optional(),
		}),
	]),
});

export const collections: {
	dynamic: typeof dynamicCollection;
	posts: typeof postsCollection;
	spec: typeof specCollection;
	ziyuan: typeof ziyuanCollection;
	diary: typeof diaryCollection;
} = {
	dynamic: dynamicCollection,
	posts: postsCollection,
	spec: specCollection,
	ziyuan: ziyuanCollection,
	diary: diaryCollection,
};
