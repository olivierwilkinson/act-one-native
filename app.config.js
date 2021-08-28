import { networkInterfaces } from "os";
import sentry from "./secret-configs/sentry.json";
import googleAuth from "./secret-configs/google-auth.json";

let apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  try {
    const nets = networkInterfaces();
    const { en0 } = nets;
    const { address } = en0.find(({ family }) => family === "IPv4");
    apiBaseUrl = `http://${address}:8000`;
  } catch (_) {
    console.warn(
      "Unable to find local network so using localhost, set API_BASE_URL to bypass automatic detection"
    );
    apiBaseUrl = "http://localhost:8000";
  }
}

export default {
  name: "ActOne",
  slug: "actone",
  privacy: "unlisted",
  version: "0.5.0",
  entryPoint: "node_modules/expo/AppEntry.js",
  platforms: ["ios", "android"],
  orientation: "portrait",
  packagerOpts: {
    config: "metro.config.js",
    // include sourceExts here as well as metro config due to https://github.com/expo/expo-cli/issues/875
    sourceExts: ["graphql", "gql"]
  },
  assetBundlePatterns: ["assets/**"],
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
    googleAuth,
    apiBaseUrl
  }
};
