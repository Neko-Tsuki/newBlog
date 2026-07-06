import { defineMiddleware } from "astro:middleware";

const skipPatterns = [
	/\.[^/]+$/,           // 跳过带扩展名的路径 (config.yml, robots.txt 等)
	/\/api\//,             // 跳过 API 路由
];

export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;

	if (pathname.endsWith("/")) {
		return next();
	}

	for (const pattern of skipPatterns) {
		if (pattern.test(pathname)) {
			return next();
		}
	}

	return new Response(null, {
		status: 301,
		headers: {
			Location: `${pathname}/${context.url.search}`,
		},
	});
});
