import Time from "./lib/utils/time.ts";
import { isr } from "./services/isr.ts";

import type { APIContext, MiddlewareHandler } from "astro";

const shouldCachePage = (req: APIContext) => {
  const { pathname } = req.url;

  const isrPages = ["bibliographies", "categories"];

  return (
    req.request.method === "GET" && isrPages.includes(pathname.split("/")[1])
  );
};

export const onRequest: MiddlewareHandler = async (req, next) => {
  if (!shouldCachePage(req)) {
    return next();
  }

  const key = req.url.pathname;
  let ttl: undefined | number;
  req.locals.cache = (milliseconds) => (ttl = milliseconds);

  try {
    if (isr.has(key)) return isr.get(key) as Response;
  } catch (_) {
    return await next();
  }
  const response = await next();

  isr.set(
    key,
    response,
    Number.isInteger(ttl) ? (ttl as number) : Time.minutes(1),
  );

  return response;
};
