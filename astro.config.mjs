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
      exclude: ["/search"],
    },
  }),
  prefetch: true,
  integrations: [
    // TODO: remove react deps or atleast use preact
    react(),
    tailwind(),
    icon({
      include: {
        lucide: [
          "search",
          "text-search",
          "x",
          "layers",
          "pencil",
          "chevron-right",
          "chevrons-right",
          "chevron-left",
          "calendar",
          "chevrons-left",
        ],
      },
    }),
  ],
});
