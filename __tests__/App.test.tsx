import "react-native";
import "react-native-reanimated";
import React from "react";
import {
  render,
  fireEvent,
  GetByAPI,
  QueryByAPI,
  waitFor
} from "react-native-testing-library";

import App from "../App";
import play from "../src/data/plays/shakespeare/AComedyOfErrors";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);
jest.mock("../src/helpers/storage.ts", () => ({
  getStoredSettings: jest.fn().mockResolvedValue({}),
  setStoredSettings: jest.fn().mockResolvedValue(undefined)
}));

describe("App", () => {
  let queryByTestId: QueryByAPI["queryByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  let getByTestId: GetByAPI["getByTestId"];
  let getByText: GetByAPI["getByText"];
  beforeEach(async () => {
    ({ queryByTestId, queryByText, getByTestId, getByText } = render(<App />));
    await waitFor(() => getByText(play.play));
  });

  it("renders Home", () => {
    expect(queryByTestId("play-list")).not.toBeNull();
  });

  it("renders header", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("navigates to Play on play list item press", async () => {
    const playListItem = getByText(play.play);
    fireEvent.press(playListItem);
    await waitFor(() => getByText("ACT 1 - SCENE 1"));
  });

  describe("Play screen navigation", () => {
    beforeEach(async () => {
      const playListItem = getByText(play.play);
      fireEvent.press(playListItem);
      await waitFor(() => getByText("ACT 1 - SCENE 1"));
    });

    it("navigates back to home screen on back button press", async () => {
      const backButton = getByTestId("header-left-button");
      fireEvent.press(backButton);

      await waitFor(async () => getByTestId("play-list"));
    });

    it("navigates to next scene on next scene button press", async () => {
      const nextSceneButton = getByTestId("next-scene-button");
      fireEvent.press(nextSceneButton);

      await waitFor(() => getByText(`ACT 1 - SCENE 2`));
    });

    describe("When in second scene", () => {
      beforeEach(async () => {
        const nextSceneButton = getByTestId("next-scene-button");
        fireEvent.press(nextSceneButton);

        await waitFor(() => getByTestId("previous-scene-button"));
      });

      it("navigates to first scene on previous scene button press", async () => {
        const { act, scene } = play.scenes[0];
        const nextSceneButton = getByTestId("previous-scene-button");
        fireEvent.press(nextSceneButton);

        await waitFor(() => getByText(`ACT ${act} - SCENE ${scene}`));
      });
    });
  });
});
