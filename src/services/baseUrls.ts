import Constants from "expo-constants";

export const { apiBaseUrl } = Constants.expoConfig?.extra || {
  apiBaseUrl: "http://localhost:8000"
};
