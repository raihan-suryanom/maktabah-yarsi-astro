import {
  BASE_API_URL,
  PUBLIC_BIBLIOGRAPHIES_API,
  PUBLIC_CATEGORIES_API,
  PUBLIC_CONTENTS_API,
  PUBLIC_SEARCH_API,
  PUBLIC_SEARCH_LIMIT,
  PUBLIC_TOC_API,
} from "astro:env/client";

const envConfigs = {
  path: {
    baseUrl: BASE_API_URL,
    categories: PUBLIC_CATEGORIES_API,
    bibliographies: PUBLIC_BIBLIOGRAPHIES_API,
    contents: PUBLIC_CONTENTS_API,
    toc: PUBLIC_TOC_API,
    search: PUBLIC_SEARCH_API,
    searchLimit: PUBLIC_SEARCH_LIMIT,
  },
};

export default Object.freeze(envConfigs);
