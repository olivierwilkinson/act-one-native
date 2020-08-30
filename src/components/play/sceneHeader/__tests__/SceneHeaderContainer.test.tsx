import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import SceneHeaderContainer from "../SceneHeaderContainer";
import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { Scene } from "../../../../types/play-types";
const {
  scenes: [scene, secondScene]
} = play;

const mount = () => {
  const result = render(
    <AppProviders>
      <PlayProviders
        play={{
          ...play,
          scenes: [scene, secondScene]
        }}
      >
        <SceneHeaderContainer />
      </PlayProviders>
    </AppProviders>
  );

  return {
    ...result,
    waitForSceneTitle: (s: Scene) =>
      waitFor(() => result.getByText(`ACT ${s.actNum} - SCENE ${s.sceneNum}`))
  };
};
describe("SceneHeaderContainer", () => {
  it("renders act and scene title", async () => {
    const { waitForSceneTitle } = mount();
    await waitForSceneTitle(scene);
  });

  it("opens scene select when scene select button pressed", async () => {
    const { findByTestId, getByText } = mount();
    const sceneSelectButton = await findByTestId("scene-select-button");
    fireEvent.press(sceneSelectButton);

    await waitFor(() => getByText("Scene Select"));
  });

  it("does not render previous scene button", async () => {
    const { waitForSceneTitle, queryByTestId } = mount();
    await waitForSceneTitle(scene);

    expect(queryByTestId("previous-scene-button")).toBeNull();
  });

  it("can go to next scene", async () => {
    const { waitForSceneTitle, getByTestId } = mount();
    await waitForSceneTitle(scene);

    fireEvent.press(getByTestId("next-scene-button"));
    await waitForSceneTitle(secondScene);
  });

  it("can go to previous scene when in second scene", async () => {
    const { waitForSceneTitle, getByTestId } = mount();
    await waitForSceneTitle(scene);

    fireEvent.press(getByTestId("next-scene-button"));
    await waitForSceneTitle(secondScene);

    fireEvent.press(getByTestId("previous-scene-button"));
    await waitForSceneTitle(scene);
  });

  it("does not render next scene button when in final scene", async () => {
    const { waitForSceneTitle, getByTestId, queryByTestId } = mount();
    await waitForSceneTitle(scene);

    fireEvent.press(getByTestId("next-scene-button"));
    await waitForSceneTitle(secondScene);

    expect(queryByTestId("next-scene-button")).toBeNull();
  });
});
