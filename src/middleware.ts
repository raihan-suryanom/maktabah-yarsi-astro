import { sequence } from "astro:middleware";

import { auth } from "./middlewares/auth";

// import { caching } from "./middlewares/caching";

export const onRequest = sequence(auth);
