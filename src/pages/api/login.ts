import jwt from "jsonwebtoken";

import configClient from "~/lib/config.client";
import configServer from "~/lib/config.server";
import Time from "~/lib/utils/time";

import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
  try {
    const formData = await context.request.formData();

    const response = await fetch(
      `${configClient.path.baseUrl}${configServer.path.login}`,
      {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
    ).then((response) => response.json());

    if (!response.token) {
      throw new jwt.JsonWebTokenError(response.message);
    }

    context.cookies.set("token", response.token, {
      httpOnly: true,
      path: "/",
      maxAge: Time.hours(2) / Time.ONE_SECOND,
    });

    return new Response(
      JSON.stringify({
        message: "You're logged in!",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: (error as Error).message,
      }),
      {
        status: 500,
      },
    );
  }
};
