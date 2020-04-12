import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  GetByAPI,
  fireEvent
} from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";
import "react-gateway";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlaySettingsModal from "../PlaySettingsModal";
import { setParams, playScreenKey } from "../../helpers/navigation";
import { PlaySettings } from "../../contexts/PlaySettings";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});
jest.mock("../../helpers/navigation", () => ({
  setParams: jest.fn(),
  playScreenKey: "play-screen-key"
}));

const mockedSetParams = setParams as jest.Mock;

describe("PlaySettingsModal", () => {
  let getByTestId: GetByAPI["getByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  let settings: PlaySettings;

  beforeEach(() => {
    settings = { selectedPlayer: "AEGEON" };

    const PlaySettingsModalContainer = createAppContainer(
      createStackNavigator(
        {
          PlaySettingsModal: { screen: PlaySettingsModal }
        },
        {
          initialRouteName: "PlaySettingsModal",
          initialRouteParams: { play, settings }
        }
      )
    );

    ({ getByTestId, queryByText, queryByTestId } = render(
      <PlaySettingsModalContainer />
    ));
  });
  afterEach(() => {
    mockedSetParams.mockRestore();
    cleanup();
  });

  it("renders done button on header", () => {
    expect(queryByTestId("header-right-button")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("renders play settings", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders selected player correctly", () => {
    expect(queryByText("AEGEON")).not.toBeNull();
  });

  describe("when new player selected", () => {
    beforeEach(() => {
      fireEvent(getByTestId("action-sheet-picker"), "onValueChange", "Gaoler");

      fireEvent.press(getByTestId("custom-action-sheet-done-button"));
    });

    it("calls setParams correctly on settings update", () => {
      expect(mockedSetParams).toHaveBeenCalledTimes(1);
      expect(mockedSetParams.mock.calls[0][1]).toEqual(playScreenKey);
      expect(mockedSetParams.mock.calls[0][2]).toEqual({
        play,
        settings: {
          ...settings,
          selectedPlayer: "Gaoler"
        }
      });
    });
  });
});
