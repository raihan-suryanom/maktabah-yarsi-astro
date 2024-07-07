const dummyPopularCategories = [
  "akhlak",
  "aqidah",
  "fiqih",
  "hadits",
  "sirah",
  "lainnya",
];

export const getPopularCategories = (): Promise<{
  popularCategories: ReadonlyArray<string>;
}> =>
  new Promise((resolve) =>
    resolve({ popularCategories: dummyPopularCategories }),
  );
