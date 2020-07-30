import sentry from "./secret-configs/sentry.json";
import googleAuth from "./secret-configs/google-auth.json";

export default {
  name: "ActOne",
  slug: "actone",
  privacy: "unlisted",
  version: "0.2.0",
  entryPoint: "node_modules/expo/AppEntry.js",
  platforms: ["ios", "android"],
  orientation: "portrait",
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: sentry.organization,
          project: sentry.project,
          authToken: sentry.authToken,
          setCommits: true
        }
      }
    ]
  },
  scheme: "actone",
  extra: {
    sentryDSN: sentry.dsn,
    googleAuth
  }
};
