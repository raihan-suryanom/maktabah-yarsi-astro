import { LOGIN_API } from "astro:env/server";

const envConfigs = {
  path: {
    login: LOGIN_API,
  },
};

export default Object.freeze(envConfigs);
