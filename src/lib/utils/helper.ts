import type { TOCProps } from "./index.type";

export const formatToSlugCase = (inputString: string) =>
  inputString.replace(/\s+/g, "-").toLowerCase();

export const reverseSlugCaseToOriginal = (inputString: string) =>
  decodeURIComponent(
    inputString
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase())
      .replace(/-/g, " "),
  );

export const getRegex = (
  caseSensitiveParams: string,
  exactMatchParams: string,
  query: string,
) => {
  const flags = caseSensitiveParams === "true" ? "gum" : "gium";
  const pattern = exactMatchParams === "true" ? `\\b${query}\\b` : query;
  const regex = new RegExp(pattern, flags);

  return regex;
};

export const wait = (milliSecond: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSecond));

export const formateDate = (date: string) =>
  new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));

export const strategy = (caseSensitive: boolean, exactMatch: boolean) => {
  if (exactMatch && caseSensitive) {
    return "STANDARD_SENSITIVE";
  }

  if (!exactMatch && !caseSensitive) {
    return "NGRAM";
  }

  if (!exactMatch && caseSensitive) {
    return "NGRAM_SENSITIVE";
  }

  return "CUSTOM";
};

export const renameAttributes = (item: TOCProps): TOCProps => {
  const newItem: TOCProps = {
    ...item,
    path: `/bibliographies/${item.bibliography}/${item.page}`,
  };

  if (item.children && item.children.length > 0) {
    newItem.children = item.children.map((child) => renameAttributes(child));
  }

  return newItem;
};
