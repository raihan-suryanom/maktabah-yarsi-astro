import searchMock from "~/fixtures/search.json";
import configServer from "~/lib/config.server";
import { getSearchResults } from "~/lib/search.server";
import { strategy } from "~/lib/utils/helper";
import stringToFormData from "~/lib/utils/stringToFormData";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();
    let data: FormData = formData;
    const hasQuery = formData.has("query");

    console.log(formData);

    if (!formData.get("id")?.toString().length) formData.delete("id");
    if (!formData.get("page")?.toString().length) formData.delete("page");

    //   Case for Page Control
    if (!hasQuery) {
      const stringParams = request.headers
        .get("referer")!
        .split("?")
        .pop() as string;

      data = stringToFormData(stringParams);
      data.set(
        "entry",
        formData.has("entry") ? formData.get("entry")! : data.get("entry")!,
      );
    }

    const bibliographies = data.getAll("bibliographies");
    const categories = data.getAll("categories");

    if (!bibliographies.toString().length) data.delete("bibliographies");
    if (!categories.toString().length) data.delete("categories");
    if (!data.has("entry") && hasQuery) data.append("entry", "1");
    if (data.has("open")) {
      data.set(
        "open",
        formData.has("open") ? formData.get("open")! : data.get("open")!,
      );
    } else {
      data.append("open", "true");
    }

    const searchResults = import.meta.env.PROD
      ? await getSearchResults({
          keyword: data.get("query")!.toString(),
          page: data.get("entry")!.toString(),
          bibliographies,
          categories,
          strategy: strategy(
            data.has("case_sensitive"),
            data.has("exact_match"),
          ),
        })
      : searchMock;

    const { totalResult, data: result, error } = searchResults;

    if (error) {
      throw new Error("Terjadi suatu kesalahan.");
    }

    if (!totalResult) {
      return redirect("/search-not-found");
    }

    if (data.has("id")) {
      data.set(
        "id",
        formData.has("id") ? formData.get("id")! : result[0].bibliography,
      );
    } else {
      data.append("id", result[0].bibliography);
    }

    if (data.has("page")) {
      data.set(
        "page",
        formData.has("page")
          ? formData.get("page")!
          : result[0].page.toString(),
      );
    } else {
      data.append("page", result[0].page.toString());
    }

    const queryString = new URLSearchParams(
      data as unknown as string,
    ).toString();

    return redirect(`${configServer.path.search}?${queryString}`, 302);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return new Response(null, { status: 404, statusText: "Not Found" });
  }
};
