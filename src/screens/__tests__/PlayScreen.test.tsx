import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  flushMicrotasksQueue
} from "react-native-testing-library";
import {
  createAppContainer,
  NavigationContainerComponent
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { NavigationActions } from "react-navigation";
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

const createPlayContainer = (params?: Params) =>
  createAppContainer(
    createStackNavigator(
      {
        Play: { screen: PlayScreen }
      },
      {
        initialRouteName: "Play",
        initialRouteKey: "play-screen",
        initialRouteParams: params
      }
    )
  );

// NavigationService.js
let navigator: NavigationContainerComponent;

function setParams(params: Params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: "Play",
      key: "play-screen",
      params
    })
  );
}

describe("PlayScreen", () => {
  let queryByText: QueryByAPI["queryByText"];

  afterEach(() => {
    cleanup();
    getStoredSettingsMock.mockRestore();
    setStoredSettingsMock.mockRestore();
  });

  describe("when mounted without params", () => {
    beforeEach(async () => {
      const PlayContainer = createPlayContainer();
      ({ queryByText } = render(
        <PlayContainer
          ref={nav => {
            if (nav) {
              navigator = nav;
            }
          }}
        />
      ));
    });

    it("renders back button on header", () => {
      expect(queryByText("Back")).not.toBeNull();
    });

    it("renders default header", () => {
      expect(queryByText("ActOne")).not.toBeNull();
    });

    it("renders error fallback", () => {
      expect(queryByText("Play could not be loaded")).not.toBeNull();
    });
  });

  describe("when mounted with play", () => {
    beforeEach(() => {
      const PlayContainer = createPlayContainer({ play });
      ({ queryByText } = render(
        <PlayContainer
          ref={nav => {
            if (nav) {
              navigator = nav;
            }
          }}
        />
      ));
    });

    it("renders correct header title", () => {
      expect(queryByText(play.play)).not.toBeNull();
    });

    it("calls getStoredSettings on mount", () => {
      expect(getStoredSettingsMock).toHaveBeenCalled();
    });

    it("renders loading indicator", () => {
      expect(queryByText(`Loading ${play.play}...`)).not.toBeNull();
    });

    describe("when finished loading", () => {
      beforeEach(async () => {
        await flushMicrotasksQueue();
      });

      it("sets settings as an empty object", () => {
        expect(setStoredSettingsMock).toHaveBeenCalledWith(play, {});
      });

      it("renders play", () => {
        expect(
          queryByText(play.scenes[0].lines[0].lineRows[0].text)
        ).not.toBeNull();
      });

      describe("when passed settings", () => {
        let settings: PlaySettings;
        beforeEach(async () => {
          settings = {
            act: 1,
            scene: 2
          };

          setParams({ play, settings });

          await flushMicrotasksQueue();
        });

        it("calls setStoredSettings", () => {
          expect(setStoredSettingsMock).toHaveBeenCalledWith(play, settings);
        });

        it("renders new scene", () => {
          expect(
            queryByText(play.scenes[1].lines[0].lineRows[0].text)
          ).not.toBeNull();
        });
      });
    });
  });
});
