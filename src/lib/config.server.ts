const envConfigs = {
  path: {
    baseUrl: import.meta.env.PUBLIC_BASE_API_URL,
    categories: import.meta.env.PUBLIC_CATEGORIES_API,
    bibliographies: import.meta.env.PUBLIC_BIBLIOGRAPHIES_API,
    contents: import.meta.env.PUBLIC_CONTENTS_API,
    toc: import.meta.env.PUBLIC_TOC_API,
    search: import.meta.env.PUBLIC_SEARCH_API,
    searchLimit: import.meta.env.PUBLIC_SEARCH_LIMIT,
  },
};

export default Object.freeze(envConfigs);
