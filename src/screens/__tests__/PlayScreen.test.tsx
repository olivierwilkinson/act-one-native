import "react-native";
import React from "react";
import {
  render,
  QueryByAPI,
  flushMicrotasksQueue,
  act
} from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { getStoredSettings, setStoredSettings } from "../../helpers/storage";
import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlayScreen from "../PlayScreen";
import AppProviders from "../../components/app/appProviders/AppProviders";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../../helpers/storage.ts", () => ({
  getStoredSettings: jest.fn().mockResolvedValue(null),
  setStoredSettings: jest.fn().mockResolvedValue(null)
}));
jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

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

  afterEach(() => {
    resetStorageMocks();
  });

  describe("when mounted without params", () => {
    beforeEach(async () => {
      ({ queryByText } = render(
        <AppProviders>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Play" component={PlayScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppProviders>
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
        <AppProviders>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Play"
                component={PlayScreen}
                initialParams={{ play }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppProviders>
      ));

      expect(queryByText(`Loading ${play.play}...`)).not.toBeNull();

      await act(flushMicrotasksQueue);
    });

    describe("when finished loading", () => {
      beforeEach(async () => {
        ({ queryByText } = render(
          <AppProviders>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Play"
                  component={PlayScreen}
                  initialParams={{ play }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </AppProviders>
        ));

        await act(flushMicrotasksQueue);
      });

      it("renders correct header title", () => {
        expect(queryByText(play.play)).not.toBeNull();
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

      describe("SceneSelect", () => {
        it.todo("can be opened");
        it.todo("opens new scene on scene select item press");
        it.todo("indicates active scene");
      });
    });
  });
});
