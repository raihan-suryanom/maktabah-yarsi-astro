import {
  getBibliographies,
  getTableOfContents,
} from "../bibliographies.server";
import { getContents } from "../content.server";

import type {
  BibliographyProps,
  CategoryProps,
  ContentProps,
  TOCProps,
} from "./index.type";

export const extractCategoryPaths = async (
  categories: ReadonlyArray<CategoryProps>,
) => {
  const result = [];
  const stack = [...categories.map((category) => ({ node: category }))];

  while (stack.length > 0) {
    const { node } = stack.pop()!;
    const { bibliographies } = await getBibliographies(node._id);

    result.push({
      params: { id: node._id },
      props: { categories, bibliographies, title: node.title },
    });

    if (node.children && node.children.length > 0) {
      stack.push(...node.children.map((child) => ({ node: child })));
    }
  }

  return result;
};

export const extractCategoryValueAndLabel = (
  categories: ReadonlyArray<CategoryProps>,
) => {
  const result = [];
  const stack = [...categories.map((category) => ({ node: category }))];

  while (stack.length > 0) {
    const { node } = stack.pop()!;
    result.push({ value: node._id, label: node.title });

    if (node.children && node.children.length > 0) {
      stack.push(...node.children.map((child) => ({ node: child })));
    }
  }

  return result;
};

export const filterLeafCategories = (
  categories: ReadonlyArray<CategoryProps>,
) => {
  return categories.reduce<CategoryProps[]>((result, category) => {
    if (!category.children) {
      result.push(category);
    } else {
      result = result.concat(filterLeafCategories(category.children));
    }
    return result;
  }, []);
};

export const extractContentBibliographyPaths = async (
  allBibliographies: ReadonlyArray<BibliographyProps>,
) => {
  const extractedData: {
    params: { id: string; page: string };
    props: BibliographyProps & { toc: readonly TOCProps[] } & Pick<
        ContentProps,
        "text"
      >;
  }[] = [];

  for (const bib of allBibliographies) {
    const { _id: id, firstPage, lastPage } = bib;

    if (!firstPage || !lastPage) {
      continue;
    }

    for (let page = firstPage; page <= lastPage; page++) {
      const { text } = await getContents(id, page.toString());
      const toc = await getTableOfContents(id);

      extractedData.push({
        params: { id, page: page.toString() },
        props: { ...bib, text, toc },
      });
    }
  }

  return extractedData;
};
