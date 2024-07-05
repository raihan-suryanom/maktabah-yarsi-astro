export type CategoryProps = {
  _id: string;
  title: string;
  path: string;
  children: ReadonlyArray<CategoryProps>;
};

export type TOCProps = {
  _id?: string;
  page: number;
  title: string;
  path: string;
  bibliography: string;
  children: ReadonlyArray<TOCProps>;
};

export type SearchParamsProps = {
  query: string;
  page: string;
  exact_match: string;
  case_sensitive: string;
  category: string;
  bibliography: string;
  open: string;
};

export type BibliographyProps = BibliographyPages & {
  _id: string;
  path: string;
  title: string;
  image: string;
  description: string;
  contributor: string;
  date_created: string;
  source: string;
  subject: string;
  creator: string;
  publisher: string;
  resource_identifier: string;
  rights: string;
  category: string;
};

export type BibliographyPages = {
  firstPage: number;
  lastPage: number;
};

export type ContentProps = {
  _id: string;
  text: string;
  page: number;
  bibliography: string;
};

export type SearchResultProps = {
  content: string;
  page: number;
  bibliography: string;
  title: string;
  highlight: string;
};
