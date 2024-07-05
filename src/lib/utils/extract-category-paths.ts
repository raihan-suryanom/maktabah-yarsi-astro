import type { BibliographyProps, CategoryProps } from "./index.type";

export const extractCategoryPaths = (
  categories: ReadonlyArray<CategoryProps>,
) => {
  const result = [];
  const stack = [...categories.map((category) => ({ node: category }))];

  while (stack.length > 0) {
    const { node } = stack.pop()!;
    result.push({ params: { id: node._id }, props: { title: node.title } });

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

export const extractContentBibliographyPaths = (
  allBibliographies: ReadonlyArray<BibliographyProps>,
) => {
  const extractedData: { params: { id: string; page: string } }[] = [];

  allBibliographies.forEach((bib) => {
    const { _id: id, firstPage, lastPage } = bib;

    if (!firstPage || !lastPage) {
      return;
    }

    for (let i = firstPage; i <= lastPage; i++) {
      extractedData.push({ params: { id, page: i.toString() } });
    }
  });

  return extractedData;
};
