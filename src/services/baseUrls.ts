import Constants from "expo-constants";

export const { apiBaseUrl } = Constants.manifest?.extra || {
  apiBaseUrl: "http://localhost:8000"
};
