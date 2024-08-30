import { getSecret, JWT_SECRET_KEY } from "astro:env/server";
import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

// const secret = getSecret("JWT_SECRET_KEY")!;
const secret = JWT_SECRET_KEY;

const verifyAuth = (token?: string) => {
  if (!token) {
    return {
      status: "unauthorized",
      msg: "please pass a request token",
    } as const;
  }

  try {
    const jwtVerifyResult = jwt.verify(token, secret);

    return {
      status: "authorized",
      payload: jwtVerifyResult,
      msg: "successfully verified auth token",
    } as const;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return { status: "error", msg: err.message } as const;
    }

    return { status: "error", msg: "could not validate auth token" } as const;
  }
};

export const auth = defineMiddleware(async (context, next) => {
  const url = context.url;
  const PUBLIC_ROUTES =
    !url.pathname.startsWith("/dashboard") || url.pathname === "/login";

  if (PUBLIC_ROUTES || context.request.method !== "GET") {
    // console.log("[auth]: SKIP", context.url.pathname);
    return next();
  }

  const token = context.cookies.get("token")?.value;
  const validationResult = verifyAuth(token);

  switch (validationResult.status) {
    case "authorized":
      return next();
    case "error":
      return new Response(JSON.stringify({ message: validationResult.msg }), {
        status: 401,
      });
    case "unauthorized":
      return context.redirect("/login");
    default:
      return context.redirect("/login");
  }
});
