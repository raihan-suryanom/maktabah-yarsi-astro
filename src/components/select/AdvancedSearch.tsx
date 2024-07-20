import { useState } from "react";

import { getBibliographies } from "~/lib/bibliographies.server";
import { extractCategoryValueAndLabel } from "~/lib/utils/extractCategoryPaths";

import Select from "./Select";

import type { BibliographyProps, CategoryProps } from "~/lib/utils/index.type";

const AdvancedSearch = ({ categories }: { categories: CategoryProps[] }) => {
  const [bibliographies, setBibliographies] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const handleCategoriesChange = async (selectedCategories: unknown) => {
    const values = (selectedCategories as { value: string }[]).map(
      ({ value }) => getBibliographies(value),
    );
    const bibliographiesPromises = Promise.all(values).then(
      (responses: { bibliographies: ReadonlyArray<BibliographyProps> }[]) => {
        const formattedBibliographies = responses
          .map(({ bibliographies }) =>
            bibliographies.map((bibliography) => ({
              value: bibliography._id,
              label: bibliography.title,
            })),
          )
          .flat();
        return formattedBibliographies;
      },
    );

    const bibliographies = await bibliographiesPromises;
    setBibliographies(bibliographies);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="absolute left-3 z-10"
          >
            <use href="#lucide--shapes" />
            <symbol id="lucide--shapes" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.35"
              >
                <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <circle cx="17.5" cy="17.5" r="3.5" />
              </g>
            </symbol>
          </svg>
          <Select
            aria-label="Pilih kategori buku"
            name="categories"
            className="w-full pl-11 pr-3"
            dimension="small"
            placeholder="Pilih Kategori"
            options={extractCategoryValueAndLabel(categories)}
            onChange={handleCategoriesChange}
            isMulti
          />
        </div>
        <small>
          Jika tidak ada yang dipilih, maka akan otomatis memilih semua
          kategori.
        </small>
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="absolute left-3 z-10"
          >
            <use href="#lucide--book-open" />
            <symbol id="lucide--book-open" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.35"
                d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
              />
            </symbol>
          </svg>
          <Select
            name="bibliographies"
            aria-label="Pilih buku"
            className="w-full pl-11 pr-3"
            placeholder="Pilih Buku"
            dimension="small"
            options={bibliographies}
            isMulti
          />
        </div>
        <small>
          Jika tidak ada yang dipilih, maka akan otomatis memilih semua buku.
        </small>
      </div>
    </>
  );
};

export default AdvancedSearch;
