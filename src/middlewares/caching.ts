import { defineMiddleware } from "astro/middleware";

import Time from "../lib/utils/time.ts";
import { isr } from "../services/isr.ts";

import type { APIContext } from "astro";

const shouldCachePage = (context: APIContext) => {
  const { pathname } = context.url;

  const isrPages = ["bibliographies", "categories"];

  return (
    // !import.meta.env.DEV &&
    context.request.method === "GET" &&
    isrPages.includes(pathname.split("/")[1])
  );
};

export const caching = defineMiddleware(async (context, next) => {
  if (!shouldCachePage(context)) {
    // console.log("[cache]: SKIP", context.url.pathname);
    return next();
  }

  const key = context.url.pathname;
  let ttl: undefined | number;
  context.locals.cache = (milliseconds) => (ttl = milliseconds);

  const response = await next();

  try {
    if (isr.has(key)) return isr.get(key) as Response;
  } catch (_) {
    return response;
  }

  isr.set(
    key,
    response,
    Number.isInteger(ttl) ? (ttl as number) : Time.minutes(1),
  );

  return response;
});
