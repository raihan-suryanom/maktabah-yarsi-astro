import configServer from "./config.server";

import type { BibliographyProps, TOCProps } from "./utils/index.type";

const {
  path: { baseUrl, categories, bibliographies, toc },
} = configServer;

export const getBibliographies = (
  uniqueIdentifier: string,
): Promise<{ bibliographies: ReadonlyArray<BibliographyProps> }> =>
  fetch(`${baseUrl}${categories}/${uniqueIdentifier}${bibliographies}`).then(
    (response) => response.json(),
  );

export const getAllBibliographies = (): Promise<
  ReadonlyArray<BibliographyProps>
> => fetch(`${baseUrl}${bibliographies}`).then((response) => response.json());

export const getTableOfContents = (
  bibliographyId: string,
): Promise<ReadonlyArray<TOCProps>> =>
  fetch(`${baseUrl}${bibliographies}/${bibliographyId}${toc}`).then(
    (response) => response.json(),
  );

export const getDetailBibliography = (
  bibliographyId: string,
): Promise<BibliographyProps> =>
  fetch(`${baseUrl}${bibliographies}/${bibliographyId}`).then((response) =>
    response.json(),
  );
