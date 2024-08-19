/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/env.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BASE_API_URL: string;
  readonly PUBLIC_CATEGORIES_API: string;
  readonly PUBLIC_BIBLIOGRAPHIES_API: string;
  readonly PUBLIC_CONTENTS_API: string;
  readonly PUBLIC_TOC_API: string;
  readonly PUBLIC_SEARCH_API: string;
  readonly PUBLIC_SEARCH_LIMIT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace App {
  interface Locals {
    // This will allow us to set the cache duration for each page.
    cache(seconds: number): void;
  }
}
