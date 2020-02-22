import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  flushMicrotasksQueue
} from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";

import { getStoredSettings, setStoredSettings } from "../../helpers/storage";
import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlayScreen, { Params } from "../PlayScreen";
import { PlaySettings } from "../../contexts/PlaySettings";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../../helpers/storage.ts", () => ({
  getStoredSettings: jest.fn().mockResolvedValue(null),
  setStoredSettings: jest.fn().mockResolvedValue(null)
}));

const getStoredSettingsMock = getStoredSettings as jest.Mock;
const setStoredSettingsMock = setStoredSettings as jest.Mock;

const createPlayContainer = (params: Partial<Params>) =>
  createAppContainer(
    createStackNavigator(
      {
        Play: { screen: PlayScreen }
      },
      {
        initialRouteName: "Play",
        initialRouteParams: params
      }
    )
  );

describe("PlayScreen", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(async () => {
    const PlayContainer = createPlayContainer({ play });
    ({ queryByText } = render(<PlayContainer />));

    await flushMicrotasksQueue();
  });
  afterEach(cleanup);

  it("renders back button on header", () => {
    expect(queryByText("Back")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("calls getStoredSettings on mount", () => {
    expect(getStoredSettingsMock).toHaveBeenCalled();
  });

  describe("when passed play and settings", () => {
    let settings: PlaySettings;
    beforeEach(async () => {
      settings = {
        selectedPlayer: "some character"
      };

      const PlayContainer = createPlayContainer({ play, settings });
      ({ queryByText } = render(<PlayContainer />));
    });

    it.skip("calls setStoredSettings", () => {
      expect(setStoredSettingsMock).toHaveBeenCalledWith(settings);
    });
  });
});
