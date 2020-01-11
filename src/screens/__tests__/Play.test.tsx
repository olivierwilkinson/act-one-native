import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import Play from "../Play";

describe("PlayScreen", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(() => {
    const PlayContainer = createAppContainer(
      createStackNavigator(
        {
          Play: { screen: Play }
        },
        {
          initialRouteName: "Play",
          initialRouteParams: { play }
        }
      )
    );

    ({ queryByText } = render(<PlayContainer />));
  });
  afterEach(cleanup);

  it("renders back button on header", () => {
    expect(queryByText("Back")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
