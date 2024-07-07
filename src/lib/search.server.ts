import configServer from "./config.server";

import type { SearchResultProps } from "./utils/index.type";

const {
  path: { baseUrl, search, searchLimit },
} = configServer;

export const getSearchResults = ({
  keyword,
  page,
  strategy,
  categories,
  bibliographies,
}: {
  keyword: string;
  page: string;
  strategy: string;
  categories: FormDataEntryValue[] | string;
  bibliographies: FormDataEntryValue[] | string;
}): Promise<{
  totalResult: number;
  data: SearchResultProps[];
  error?: boolean;
}> =>
  fetch(`${baseUrl}${search}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "no-store",
    body: JSON.stringify({
      page,
      limit: searchLimit,
      categories,
      bibliographies,
      strategy,
      keyword,
    }),
  })
    .then((response) => response.json())
    .catch(() => ({
      error: true,
    }));
