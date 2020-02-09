import "react-native";
import "react-native-reanimated";
import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
  GetByAPI,
  QueryByAPI
} from "react-native-testing-library";

import App from "../App";
import play from "../src/data/plays/shakespeare/AComedyOfErrors";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("App", () => {
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  let getByText: GetByAPI["getByText"];
  let getAllByText: GetByAPI["getAllByText"];
  beforeEach(() => {
    ({ queryByTestId, getByTestId, getByText, getAllByText } = render(<App />));
  });
  afterEach(cleanup);

  it("renders Home", () => {
    expect(queryByTestId("play-list")).not.toBeNull();
  });

  it("navigates to Play on play list item press", async () => {
    const playListItem = getByText(play.play);
    fireEvent.press(playListItem);

    await waitForElement(() => getByTestId("play-scene-header"));
  });

  describe("Play screen navigation", () => {
    beforeEach(async () => {
      const playListItem = getByText(play.play);
      fireEvent.press(playListItem);

      await waitForElement(() => getByTestId("play-scene-header"));
    });

    it("navigates to SceneSelectModal on scene select button press", async () => {
      const sceneSelectButton = getByTestId("scene-select-button");
      fireEvent.press(sceneSelectButton);

      await waitForElement(() => getByTestId("scene-select"));
    });

    it("navigates to PlaySettingsModal on right header button press", async () => {
      const playSettingsButton = getByTestId("header-right-button");
      fireEvent.press(playSettingsButton);

      await waitForElement(() => getByTestId("play-settings"));
    });

    it("navigates to next scene on next scene button press", async () => {
      const nextSceneButton = getByTestId("next-scene-button");
      fireEvent.press(nextSceneButton);

      await waitForElement(() => getByText(`ACT 1 - SCENE 2`));
    });

    describe("PlaySettingsModal navigation", () => {
      beforeEach(async () => {
        const playSettingsButton = getByTestId("header-right-button");
        fireEvent.press(playSettingsButton);

        await waitForElement(() => getByTestId("play-settings"));
      });

      it("navigates back to play on cancel button press", async () => {
        const headerCancelButton = getByText("Cancel");
        fireEvent.press(headerCancelButton);

        await waitForElement(() => getByTestId("play-scene-header"));
      });
    });

    describe("SceneSelectModal navigation", () => {
      beforeEach(async () => {
        const sceneSelectButton = getByTestId("scene-select-button");
        fireEvent.press(sceneSelectButton);

        await waitForElement(() => getByTestId("scene-select"));
      });

      it("navigates to correct scene on scene list item press", async () => {
        const sceneListItems = getAllByText("SCENE 2");
        expect(sceneListItems.length).toBeGreaterThan(0);
        fireEvent.press(sceneListItems[0]);

        await waitForElement(() => getByText("ACT 1 - SCENE 2"));
      });

      it("navigates back to current scene on close button press", async () => {
        const headerCloseButton = getByText("Cancel");
        fireEvent.press(headerCloseButton);

        await waitForElement(() => getByText("ACT 1 - SCENE 1"));
      });
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
