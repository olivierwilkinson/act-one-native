import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  RenderAPI,
  GetByAPI
} from "react-native-testing-library";

import Scene from "../Scene";
import PlayPositionContext from "../../../contexts/PlayPosition";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [scene]
} = play;
const {
  lines: [line]
} = scene;
const { colourByPlayer } = play;

describe("Scene", () => {
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  let rerender: RenderAPI["rerender"];
  let scrollToLocation: jest.Mock;
  let openSceneSelect: jest.Mock;
  beforeEach(() => {
    openSceneSelect = jest.fn();

    ({ queryByTestId, getByTestId, rerender } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLine: () => null
        }}
      >
        <Scene
          {...scene}
          openSceneSelect={openSceneSelect}
          colourByPlayer={colourByPlayer}
        />
      </PlayPositionContext.Provider>
    ));

    /*
      monkey-patch scrollToLocation on the sectionList Scene holds a
      reference to
    */
    scrollToLocation = jest.fn();
    const sceneLines = queryByTestId("play-scene-lines");
    sceneLines.instance.scrollToLocation = scrollToLocation;
  });
  afterEach(cleanup);

  it("renders play scene header", () => {
    expect(getByTestId("play-scene-header")).not.toBeNull();
  });

  it("renders play scene lines", () => {
    expect(getByTestId("play-scene-lines")).not.toBeNull();
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
          <Scene
            {...newScene}
            openSceneSelect={openSceneSelect}
            colourByPlayer={colourByPlayer}
          />
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
          <Scene
            {...newScene}
            openSceneSelect={openSceneSelect}
            colourByPlayer={colourByPlayer}
          />
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
