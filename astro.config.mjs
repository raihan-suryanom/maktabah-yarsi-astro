import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

// THIS IS GLOBAL LIST OF TODOS
// TODO: handle error case for most scenarios(fetching and action)
// TODO: Experimental: Content Layer API??
// TODO: save state for search modal inputs(feature search) from url search params
// TODO: FIX and separate search.ts logic for search feature.
// TODO: PageControl bug when entering custom input(redirect to `/search` page)
// TODO: Learn & Implement Advanced ViewTransition
// TODO: refactor clsx to class:list Astro built-it
// TODO: use server action instead (literally 0 js).

// https://astro.build/config
export default defineConfig({
  // TODO: update this when ready to deploy prod
  site: "https://maktabah.yarsi.ac.id",
  output: "server",
  adapter: vercel({
    isr: {
      bypassToken:
        "ISQXiebFFxjNF2hnd6xIgHRBBxJyS1ln.J6EZSPrdIn7WDx9Iijg8n8hFs401EH8E.u8QQaMJ5uO527pD6smPSfoUMtYCaQ9Zd",
      exclude: [
        "/search",
        "/api/login",
        "/api/search",
        "/_server-islands/ProfileAsync",
      ],
    },
  }),
  prefetch: true,
  integrations: [
    setPrerender(),
    // TODO: remove react deps or at least use preact
    react(),
    tailwind(),
    icon({
      include: {
        lucide: [
          "book-open",
          "calendar",
          "chevron-right",
          "chevrons-right",
          "chevron-left",
          "chevrons-left",
          "frown",
          "layers",
          "pencil",
          "search",
          "search-x",
          "shapes",
          "text-search",
          "user",
          "x",
        ],
      },
    }),
  ],
  experimental: {
    serverIslands: true,
    env: {
      schema: {
        BASE_API_URL: envField.string({
          context: "client",
          access: "public",
          startsWith: "http",
        }),
        PUBLIC_CATEGORIES_API: envField.string({
          context: "client",
          access: "public",
          startsWith: "/",
        }),
        PUBLIC_BIBLIOGRAPHIES_API: envField.string({
          context: "client",
          access: "public",
          startsWith: "/",
        }),
        PUBLIC_CONTENTS_API: envField.string({
          context: "client",
          access: "public",
          startsWith: "/",
        }),
        PUBLIC_TOC_API: envField.string({
          context: "client",
          access: "public",
          startsWith: "/",
        }),
        PUBLIC_SEARCH_API: envField.string({
          context: "client",
          access: "public",
          startsWith: "/",
        }),
        PUBLIC_SEARCH_LIMIT: envField.string({
          context: "client",
          access: "public",
        }),
        JWT_SECRET_KEY: envField.string({
          context: "server",
          access: "public",
        }),
        LOGIN_API: envField.string({
          context: "server",
          access: "public",
          startsWith: "/",
        }),
      },
      validateSecrets: true,
    },
  },
});

function setPrerender() {
  const preRenderedPages = ["/index.astro", "/about.astro"];

  return {
    name: "set-prerender",
    hooks: {
      "astro:route:setup": ({ route }) => {
        if (preRenderedPages.some((path) => route.component.endsWith(path))) {
          route.prerender = true;
        }
      },
    },
  };
}
