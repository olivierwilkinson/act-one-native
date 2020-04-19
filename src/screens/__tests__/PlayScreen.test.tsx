import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  flushMicrotasksQueue,
  act
} from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-reanimated";

import { getStoredSettings, setStoredSettings } from "../../helpers/storage";
import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlayScreen from "../PlayScreen";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../../helpers/storage.ts", () => ({
  getStoredSettings: jest.fn().mockResolvedValue(null),
  setStoredSettings: jest.fn().mockResolvedValue(null)
}));

const getStoredSettingsMock = getStoredSettings as jest.Mock;
const setStoredSettingsMock = setStoredSettings as jest.Mock;

const resetStorageMocks = () => {
  getStoredSettingsMock.mockRestore();
  setStoredSettingsMock.mockRestore();
  getStoredSettingsMock.mockResolvedValue(null);
  setStoredSettingsMock.mockResolvedValue(null);
};

const Stack = createStackNavigator();

// TODO:- add tests for opening and closing modals

describe("PlayScreen", () => {
  let queryByText: QueryByAPI["queryByText"];
  let queryAllByText: QueryByAPI["queryAllByText"];

  afterEach(() => {
    resetStorageMocks();
    cleanup();
  });

  describe("when mounted without params", () => {
    beforeEach(async () => {
      ({ queryByText } = render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Play" component={PlayScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ));

      await flushMicrotasksQueue();
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
    it("renders loading indicator initially", async () => {
      ({ queryByText } = render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Play"
              component={PlayScreen}
              initialParams={{ play }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ));

      expect(queryByText(`Loading ${play.play}...`)).not.toBeNull();

      await act(flushMicrotasksQueue);
    });

    describe("when finished loading", () => {
      beforeEach(async () => {
        ({ queryByText, queryAllByText } = render(
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Play"
                component={PlayScreen}
                initialParams={{ play }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        ));

        await act(flushMicrotasksQueue);
      });

      it("renders correct header titles", () => {
        // expect every modal in play screen to have play as title
        expect(queryAllByText(play.play)).toHaveLength(3);
      });

      it("calls getStoredSettings on mount", () => {
        expect(getStoredSettingsMock).toHaveBeenCalled();
      });

      it("sets settings as an empty object", () => {
        expect(setStoredSettingsMock).toHaveBeenCalledWith(play, {});
      });

      it("renders play", () => {
        expect(
          queryByText(play.scenes[0].lines[0].lineRows[0].text)
        ).not.toBeNull();
      });
    });
  });
});
