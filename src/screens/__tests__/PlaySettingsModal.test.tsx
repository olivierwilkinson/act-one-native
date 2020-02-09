import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlaySettingsModal from "../PlaySettingsModal";

describe("PlaySettingsModal", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(() => {
    const PlaySettingsModalContainer = createAppContainer(
      createStackNavigator(
        {
          PlaySettingsModal: { screen: PlaySettingsModal }
        },
        {
          initialRouteName: "PlaySettingsModal",
          initialRouteParams: { play }
        }
      )
    );

    ({ queryByText } = render(<PlaySettingsModalContainer />));
  });
  afterEach(cleanup);

  it("renders cancel button on header", () => {
    expect(queryByText("Cancel")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
