import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    react(),
    tailwind(),
    icon({
      include: {
        lucide: ["home"],
      },
    }),
  ],
  adapter: vercel(),
});
