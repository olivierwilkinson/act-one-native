import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import Scene from "../Scene";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import { SectionList } from "react-native";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
const {
  scenes: [scene]
} = play;
const {
  lines: [line]
} = scene;

const mount = async () => {
  const result = render(
    <AppProviders>
      <PlayProviders play={play}>
        <Scene />
      </PlayProviders>
    </AppProviders>
  );

  const scrollToLocationMock = jest.fn();
  const [sceneLines] = await waitFor(() =>
    result.UNSAFE_getAllByType(SectionList)
  );
  sceneLines.instance.scrollToLocation = scrollToLocationMock;

  return {
    ...result,
    scrollToLocationMock
  };
};

describe("Scene", () => {
  it("renders play scene header", async () => {
    const { findByText } = await mount();
    await findByText("ACT 1 - SCENE 1");
  });

  it("renders play scene lines", async () => {
    const { findByText } = await mount();
    await findByText(line.lineRows[0].text);
  });

  it("renders playback controls", async () => {
    const { findByTestId } = await mount();
    await findByTestId("playback-controls");
  });

  it("scrolls lines to the top when scene changes", async () => {
    const { findByTestId, findByText, scrollToLocationMock } = await mount();
    const nextSceneButton = await findByTestId("next-scene-button");
    fireEvent.press(nextSceneButton);

    await findByText("ACT 1 - SCENE 2");

    expect(scrollToLocationMock).toHaveBeenCalledWith({
      animated: false,
      sectionIndex: 0,
      itemIndex: 0
    });
  });

  it("scrolls lines to the top when act changes", async () => {
    const { findByTestId, findByText, scrollToLocationMock } = await mount();

    fireEvent.press(await findByTestId("next-scene-button"));
    await findByText("ACT 1 - SCENE 2");

    scrollToLocationMock.mockRestore();

    fireEvent.press(await findByTestId("next-scene-button"));
    await findByText("ACT 2 - SCENE 1");

    expect(scrollToLocationMock).toHaveBeenCalledWith({
      animated: false,
      sectionIndex: 0,
      itemIndex: 0
    });
  });
});
