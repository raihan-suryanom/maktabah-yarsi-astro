import configServer from "./config.server";

import type { CategoryProps } from "./utils/index.type";

const {
  path: { baseUrl, categories },
} = configServer;

export const getCategories = (): Promise<{
  categories: ReadonlyArray<CategoryProps>;
}> => fetch(`${baseUrl}${categories}`).then((response) => response.json());

export const getCategoryTitle = (categoryId: string): Promise<CategoryProps> =>
  fetch(`${baseUrl}${categories}/${categoryId}`).then((response) =>
    response.json(),
  );
