import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";

const { apiBaseUrl } = Constants.manifest.extra || {
  apiBaseUrl: "http://localhost"
};

export default async (
  input: RequestInfo,
  init: RequestInit | undefined = {}
) => {
  let { headers } = init;

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
