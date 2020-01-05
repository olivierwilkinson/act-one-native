import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import Home from "../Home";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("PlayScreen", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(() => {
    const HomeContainer = createAppContainer(
      createStackNavigator({
        Home: { screen: Home }
      })
    );

    ({ queryByText } = render(<HomeContainer />));
  });
  afterEach(cleanup);

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("renders play list", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
