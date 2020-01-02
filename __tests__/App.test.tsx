import "react-native";
import "react-native-reanimated";
import React from "react";
import { render } from "react-native-testing-library";

import App from "../App";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

it("renders", () => {
  render(<App />);
});
