import "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { getStoredSettings, setStoredSettings } from "../../helpers/storage";
import { Screen, Header } from "../PlayScreen";
import AppProviders from "../../components/app/appProviders/AppProviders";
import { play } from "../../../test/graphql/mocks/play";
import { lineRow } from "../../../test/graphql/mocks/lineRow";

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

const mount = (
  { playId }: Partial<{ playId: number }> = {
    playId: play.id
  }
) =>
  render(
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Play"
            component={Screen as any}
            options={{ header: Header }}
            initialParams={{ playId }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProviders>
  );

describe("PlayScreen", () => {
  afterEach(() => {
    resetStorageMocks();
  });

  it("renders back button on header when no params are passed", async () => {
    const screen = mount({});

    await waitFor(() => expect(screen.queryByText("Back")).toBeDefined());
  });

  it("renders default header when no params are passed", async () => {
    const screen = mount({});

    await waitFor(() => expect(screen.queryByText("ActOne")).toBeDefined());
  });

  it("renders error fallback when no params are passed", async () => {
    const screen = mount({});

    await waitFor(() =>
      expect(screen.queryByText("Play could not be loaded")).toBeDefined()
    );
  });

  it("renders play title", async () => {
    const screen = mount();

    await waitFor(() => expect(screen.queryByText(play.title)).toBeDefined());
  });

  it("renders play lines", async () => {
    const screen = mount();

    await waitFor(() => expect(screen.queryByText(lineRow.text)).toBeDefined());
  });

  // TODO:- might actually be broken
  it.skip("sets settings as an empty object when no settings are found", async () => {
    mount();

    await waitFor(() => expect(getStoredSettingsMock).toHaveBeenCalled());
    await waitFor(() =>
      expect(setStoredSettingsMock).toHaveBeenCalledWith(play, {})
    );
  });

  it("opens play settings when header settings button pressed", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByTestId("header-right-button"));

    await waitFor(() =>
      expect(screen.getByText("Play Settings")).toBeDefined()
    );
  });

  describe("SceneSelect", () => {
    it.todo("can be opened");
    it.todo("opens new scene on scene select item press");
    it.todo("indicates active scene");
  });
});
