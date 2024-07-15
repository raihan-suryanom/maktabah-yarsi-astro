import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // TODO: update this when ready to deploy prod
  site: "https://maktabah.yarsi.ac.id",
  output: "hybrid",
  adapter: vercel({
    // TODO: experiment to on-demand ISR
    isr: {
      bypassToken: "EBPUjYLtnmlJSKpUPMRrpUtVOVfpajKM",
      exclude: [
        "/search",
        "/api/search",
      ],
    },
  }),
  prefetch: true,
  integrations: [
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
          "layers",
          "pencil",
          "search",
          "shapes",
          "text-search",
          "x",
        ],
      },
    }),
  ],
});
