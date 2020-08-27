import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";

const { apiBaseUrl } = Constants.manifest.extra || {
  apiBaseUrl: "http://localhost"
};

export default async (
  input: RequestInfo,
  init: RequestInit | undefined = {}
) => {
  let headers: RequestInit["headers"] = {
    ...init.headers,
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const cookie = await AsyncStorage.getItem(apiBaseUrl);
  if (cookie) {
    headers = {
      ...headers,
      cookie
    };
  }

  return fetch(input, {
    ...init,
    headers,
    credentials: "omit"
  });
};
