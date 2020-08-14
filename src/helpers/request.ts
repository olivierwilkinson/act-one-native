import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";

const { apiBaseUrl } = Constants.manifest.extra;

export default async function request(path: string, params: RequestInit = {}) {
  let headers: RequestInit["headers"] = {
    ...params.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const cookie = await AsyncStorage.getItem(apiBaseUrl);
  if (cookie) {
    headers = {
      ...headers,
      cookie,
    };
  }

  const res = await fetch(path, {
    ...params,
    headers,
    credentials: "omit",
  });

  return res;
}
