import "react-native";
import React from "react";
import { render, RenderAPI, GetByAPI } from "react-native-testing-library";

import Scene from "../Scene";
import PlayPositionContext from "../../../contexts/PlayPosition";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { SectionList } from "react-native";
const {
  scenes: [scene]
} = play;
const {
  lines: [line]
} = scene;
const { colourByPlayer } = play;

describe("Scene", () => {
  let getByTestId: GetByAPI["getByTestId"];
  let getByText: GetByAPI["getByText"];
  let getByType: GetByAPI["UNSAFE_getByType"];
  let rerender: RenderAPI["rerender"];
  let scrollToLocation: jest.Mock;

  beforeEach(() => {
    ({ getByTestId, getByText, rerender, UNSAFE_getByType: getByType } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLine: () => null
        }}
      >
        <Scene {...scene} colourByPlayer={colourByPlayer} />
      </PlayPositionContext.Provider>
    ));

    scrollToLocation = jest.fn();
    const sceneLines = getByType(SectionList);
    sceneLines.instance.scrollToLocation = scrollToLocation;
  });

  it("renders play scene header", () => {
    expect(getByText("ACT 1 - SCENE 1")).not.toBeNull();
  });

  it("renders play scene lines", () => {
    expect(getByText(line.lineRows[0].text)).not.toBeNull();
  });

  it("renders playback controls", () => {
    expect(getByTestId("playback-controls")).not.toBeNull();
  });

  describe("when act number changes", () => {
    beforeEach(() => {
      const newScene = { ...scene, act: 2 };
      rerender(
        <PlayPositionContext.Provider
          value={{
            activeLine: line,
            activeScene: newScene,
            setActiveLine: () => null
          }}
        >
          <Scene {...newScene} colourByPlayer={colourByPlayer} />
        </PlayPositionContext.Provider>
      );
    });

    it("scrolls list to the top", () => {
      expect(scrollToLocation).toHaveBeenCalledWith({
        animated: false,
        sectionIndex: 0,
        itemIndex: 0
      });
    });
  });

  describe("when scene number changes", () => {
    beforeEach(() => {
      const newScene = { ...scene, scene: 2 };
      rerender(
        <PlayPositionContext.Provider
          value={{
            activeLine: line,
            activeScene: newScene,
            setActiveLine: () => null
          }}
        >
          <Scene {...newScene} colourByPlayer={colourByPlayer} />
        </PlayPositionContext.Provider>
      );
    });

    it("scrolls list to the top", () => {
      expect(scrollToLocation).toHaveBeenCalledWith({
        animated: false,
        sectionIndex: 0,
        itemIndex: 0
      });
    });
  });
});
