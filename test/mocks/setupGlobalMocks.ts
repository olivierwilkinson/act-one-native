import AsyncStorage from "@react-native-async-storage/async-storage";

import navigation from "./navigation";
import speech from "./speech";

jest.mock("sentry-expo");
jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);
jest.mock("@react-navigation/native", () => {
  const navigation = jest.requireActual("./navigation").default;
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn().mockImplementation(() => navigation)
  };
});
jest.mock("@react-native-async-storage/async-storage", () => {
  const MockAsyncStorage = require("mock-async-storage").default;
  return new MockAsyncStorage();
});
jest.mock("expo-speech", () => jest.requireActual("./speech").default);

// https://github.com/software-mansion/react-native-gesture-handler/issues/344
jest.mock("react-native-gesture-handler", () => ({
  ...jest.requireActual("react-native-gesture-handler"),
  GestureHandlerRootView: require("react-native/Libraries/Components/View/View")
}));

afterEach(async () => {
  await AsyncStorage.clear();
  navigation.mockRestore();
  speech.reset();
});
