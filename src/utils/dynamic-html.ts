import DOMPurify from "dompurify";

const config = {
	USE_PROFILES: { html: true },
	FORBID_TAGS: [
		"style",
		"iframe",
		"form",
		"input",
		"button",
		"textarea",
		"select",
	],
	FORBID_ATTR: ["style"],
	ADD_ATTR: ["target"],
	ALLOWED_URI_REGEXP:
		/^(?:(?:https?|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
};

export function sanitizeDynamicHtml(html: string): string {
	return DOMPurify.sanitize(html, config);
}

export function dynamicPlainText(html: string): string {
	const fragment = DOMPurify.sanitize(html, {
		...config,
		RETURN_DOM_FRAGMENT: true,
	});
	return fragment.textContent?.trim() || "";
}

export function dynamicImageUrl(src: string): string | null {
	try {
		const url = new URL(src, document.baseURI);
		return url.protocol === "https:" || url.protocol === "http:"
			? url.href
			: null;
	} catch {
		return null;
	}
}
