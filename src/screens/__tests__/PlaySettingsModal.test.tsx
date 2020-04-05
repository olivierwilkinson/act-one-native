import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";
import "react-gateway";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlaySettingsModal from "../PlaySettingsModal";

jest.mock("react-gateway", () => ({
  Gateway: () => "View",
  GatewayDest: () => "View"
}));

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
          initialRouteParams: { play, settings: { currentPlayer: "" } }
        }
      )
    );

    ({ queryByText } = render(<PlaySettingsModalContainer />));
  });
  afterEach(cleanup);

  it("renders done button on header", () => {
    expect(queryByText("Done")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("renders play settings", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders character setting", () => {
    expect(queryByText("Character")).not.toBeNull();
  });

  it.skip("calls setParams correctly on settings update", () => {});
});
