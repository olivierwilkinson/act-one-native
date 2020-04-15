import "react-native";
import "react-native-reanimated";
import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
  GetByAPI,
  QueryByAPI,
  flushMicrotasksQueue,
  act
} from "react-native-testing-library";

import App from "../App";
import play from "../src/data/plays/shakespeare/AComedyOfErrors";

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
  });
  afterEach(cleanup);

  it("renders Home", () => {
    expect(queryByTestId("play-list")).not.toBeNull();
  });

  it("renders header", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("navigates to Play on play list item press", async () => {
    const playListItem = getByText(play.play);
    fireEvent.press(playListItem);
    await act(flushMicrotasksQueue);

    expect(queryByTestId("play-scene-header")).not.toBeNull();
  });

  describe("Play screen navigation", () => {
    beforeEach(async () => {
      const playListItem = getByText(play.play);
      fireEvent.press(playListItem);
      await act(flushMicrotasksQueue);
    });

    it("navigates back to home screen on back button press", async () => {
      const backButton = getByTestId("header-left-button");
      await act(async () => {
        fireEvent.press(backButton);
        await flushMicrotasksQueue();
      });

      expect(queryByTestId("play-list")).not.toBeNull();
    });

    it("navigates to next scene on next scene button press", async () => {
      const nextSceneButton = getByTestId("next-scene-button");
      fireEvent.press(nextSceneButton);
      await act(flushMicrotasksQueue);

      await waitForElement(() => getByText(`ACT 1 - SCENE 2`));
    });

    describe("When in second scene", () => {
      beforeEach(async () => {
        const nextSceneButton = getByTestId("next-scene-button");
        fireEvent.press(nextSceneButton);

        await waitForElement(() => getByTestId("previous-scene-button"));
      });

      it("navigates to first scene on previous scene button press", async () => {
        const { act, scene } = play.scenes[0];
        const nextSceneButton = getByTestId("previous-scene-button");
        fireEvent.press(nextSceneButton);

        await waitForElement(() => getByText(`ACT ${act} - SCENE ${scene}`));
      });
    });
  });
});
