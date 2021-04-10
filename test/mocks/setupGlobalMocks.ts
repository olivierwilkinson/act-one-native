import AsyncStorage from "@react-native-community/async-storage"

import navigation from "./navigation";
import speech from './speech';

jest.mock("sentry-expo");
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);
jest.mock("expo-permissions", () => ({
  ...jest.requireActual("expo-permissions"),
  getAsync: jest.fn().mockResolvedValue({ permissions: {} }),
  askAsync: jest.fn().mockResolvedValue({ permissions: {} })
}));
jest.mock("@react-navigation/native", () => {
  const navigation = jest.requireActual("./navigation").default;
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn().mockImplementation(() => navigation),
  };
});
jest.mock("@react-native-community/async-storage", () => {
  const MockAsyncStorage = require("mock-async-storage").default;
  return new MockAsyncStorage();
});
jest.mock(
  "expo-speech",
  () => jest.requireActual("./speech").default
);

afterEach(async () => {
  await AsyncStorage.clear();
  navigation.mockRestore();
  speech.reset();
});
