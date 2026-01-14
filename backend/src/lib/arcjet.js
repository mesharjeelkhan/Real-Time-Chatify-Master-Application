import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

const isDev = ENV.NODE_ENV === "development";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({
      mode: isDev ? "DRY_RUN" : "LIVE",
    }),

    detectBot({
      mode: isDev ? "DRY_RUN" : "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),

    slidingWindow({
      mode: isDev ? "DRY_RUN" : "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
