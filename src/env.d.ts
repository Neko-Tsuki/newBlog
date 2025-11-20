/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly MEILI_MASTER_KEY: string;
	readonly OPENAI_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
