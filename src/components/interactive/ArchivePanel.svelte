<script lang="ts">
import { onMount } from "svelte";
import I18nKey from "@/i18n/i18nKey";
import { i18n } from "@/i18n/translation";
import { getPostUrlBySlug } from "@/utils/url-utils";

/**
 * 文章归档输入
 */
export let sortedPosts: Post[] = [];

/**
 * 活动归档输入（从 timeline.json 读取）
 */
export let timelineData: TimelineItem[] = [];

/**
 * 分类与标签过滤参数（仅对文章有效）
 */
export let tags: string[] = [];
export let categories: string[] = [];

const params = new URLSearchParams(window.location.search);
tags = params.has("tag") ? params.getAll("tag") : [];
categories = params.has("category") ? params.getAll("category") : [];
const uncategorized = params.get("uncategorized");

/**
 * 类型定义
 */
interface Post {
	slug: string;
	data: {
		title: string;
		tags: string[];
		category?: string;
		published: Date;
	};
}

interface Group {
	year: number;
	posts: Post[];
}

interface TimelineItem {
	title: string;
	date: string; // "2026/1/1"
	tags: string[];
}

let groups: Group[] = [];
let eventGroups: { year: number; events: TimelineItem[] }[] = [];

function formatDate(date: Date | string) {
	const d = new Date(date);
	const month = (d.getMonth() + 1).toString().padStart(2, "0");
	const day = d.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	return tagList.map((t) => `#${t}`).join(" ");
}

/**
 * 初始化逻辑
 */
onMount(() => {
	if (timelineData && timelineData.length > 0) {
		// ✅ 活动模式
		const grouped = timelineData.reduce(
			(acc, item) => {
				const year = new Date(item.date).getFullYear();
				if (!acc[year]) acc[year] = [];
				acc[year].push(item);
				return acc;
			},
			{} as Record<number, TimelineItem[]>,
		);

		eventGroups = Object.keys(grouped)
			.map((y) => ({
				year: Number(y),
				events: grouped[Number(y)],
			}))
			.sort((a, b) => b.year - a.year);

		return;
	}

	// ✅ 文章模式
	let filteredPosts: Post[] = sortedPosts;

	if (tags.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) =>
				Array.isArray(post.data.tags) &&
				post.data.tags.some((tag) => tags.includes(tag)),
		);
	}

	if (categories.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) => post.data.category && categories.includes(post.data.category),
		);
	}

	if (uncategorized) {
		filteredPosts = filteredPosts.filter((post) => !post.data.category);
	}

	filteredPosts = filteredPosts
		.slice()
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime());

	const grouped = filteredPosts.reduce(
		(acc, post) => {
			const year = post.data.published.getFullYear();
			if (!acc[year]) acc[year] = [];
			acc[year].push(post);
			return acc;
		},
		{} as Record<number, Post[]>,
	);

	const groupedPostsArray = Object.keys(grouped).map((yearStr) => ({
		year: Number(yearStr),
		posts: grouped[Number(yearStr)],
	}));

	groupedPostsArray.sort((a, b) => b.year - a.year);

	groups = groupedPostsArray;
});
</script>

<!-- 🧭 如果是文章归档 -->
{#if sortedPosts && sortedPosts.length > 0}
<div class="card-base px-8 py-6">
	{#each groups as group}
		<div>
			<div class="flex flex-row w-full items-center h-[3.75rem]">
				<div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
					{group.year}
				</div>
				<div class="w-[15%] md:w-[10%]">
					<div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
				</div>
				<div class="w-[70%] md:w-[80%] transition text-left text-50">
					{group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
				</div>
			</div>

			{#each group.posts as post}
				<a
					href={getPostUrlBySlug(post.slug)}
					aria-label={post.data.title}
					class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]"
				>
					<div class="flex flex-row justify-start items-center h-full">
						<div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
							{formatDate(post.data.published)}
						</div>

						<div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
							<div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"></div>
						</div>

						<div class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">
							{post.data.title}
						</div>

						<div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">
							{formatTag(post.data.tags)}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/each}
</div>

<!-- 🧭 如果是活动归档 -->
{:else if timelineData && timelineData.length > 0}
<div class="card-base px-8 py-6">
	{#each eventGroups as group}
		<div>
			<div class="flex flex-row w-full items-center h-[3.75rem]">
				<div class="w-[15%] md:w-[10%] transition text-2xl font-bold text-right text-75">
					{group.year}
				</div>
				<div class="w-[15%] md:w-[10%]">
					<div class="h-3 w-3 bg-none rounded-full outline outline-[var(--primary)] mx-auto -outline-offset-[2px] z-50 outline-3"></div>
				</div>
				<div class="w-[70%] md:w-[80%] transition text-left text-50">
					{group.events.length} 个活动
				</div>
			</div>

			{#each group.events as event}
				<div class="group btn-plain !block h-10 w-full rounded-lg hover:text-[initial]">
					<div class="flex flex-row justify-start items-center h-full">
						<div class="w-[15%] md:w-[10%] transition text-sm text-right text-50">
							{formatDate(event.date)}
						</div>

						<div class="w-[15%] md:w-[10%] relative dash-line h-full flex items-center">
							<div class="transition-all mx-auto w-1 h-1 rounded group-hover:h-5 bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)] outline outline-4 z-50 outline-[var(--card-bg)] group-hover:outline-[var(--btn-plain-bg-hover)] group-active:outline-[var(--btn-plain-bg-active)]"></div>
						</div>

						<div class="w-[70%] md:max-w-[65%] md:w-[65%] text-left font-bold group-hover:translate-x-1 transition-all group-hover:text-[var(--primary)] text-75 pr-8 whitespace-nowrap overflow-ellipsis overflow-hidden">
							{event.title}
						</div>

						<div class="hidden md:block md:w-[15%] text-left text-sm transition whitespace-nowrap overflow-ellipsis overflow-hidden text-30">
							{formatTag(event.tags)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
{/if}
