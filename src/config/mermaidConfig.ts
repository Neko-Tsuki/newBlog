import type { MermaidConfig, MermaidThemeName } from "../types/mermaidConfig";

/**
 * Mermaid 图表渲染配置
 *
 * 使用 merman 在构建时将 mermaid 代码块渲染为静态 SVG，
 * 支持浅色/深色双主题，通过 CSS 自动切换。
 *
 * @see https://github.com/Latias94/merman
 */
export const mermaidConfig: MermaidConfig = {
	/**
	 * 亮色模式主题。
	 * 可选：editor-light、gruvbox-light、ayu-light。
	 * 注意：merman 已不再支持 github-light/github-dark 等 beautiful-mermaid 旧主题名。
	 * 如需 GitHub 风格，可改用 editor-light（最接近 GitHub Light 的简洁外观）。
	 */
	lightTheme: "github-light" as MermaidThemeName,

	/**
	 * 暗色模式主题。
	 * 可选：editor-dark、one-dark、gruvbox-dark、ayu-dark。
	 * 注意：merman 已不再支持 github-light/github-dark 等 beautiful-mermaid 旧主题名。
	 * 如需 GitHub Dark 风格，可改用 one-dark（Atom 经典，接近 GitHub Dark 配色）。
	 */
	darkTheme: "github-dark" as MermaidThemeName,
};
