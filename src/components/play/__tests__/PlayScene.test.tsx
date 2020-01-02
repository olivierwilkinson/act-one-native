import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI,
  RenderAPI
} from "react-native-testing-library";

import PlayScene from "../PlayScene";
import PlayPositionContext from "../../../contexts/PlayPosition";
import { createColourByPlayer } from "../../../helpers/play";
import PlayNavigationContext from "../../../contexts/PlayNavigation";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [scene]
} = play;
const {
  lines: [line]
} = scene;

const colourByPlayer = createColourByPlayer(play);

describe("PlayScene", () => {
  let scrollToLocation: jest.Mock;
  let queryByTestId: QueryByAPI["queryByTestId"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    ({ queryByTestId, rerender } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLineById: () => null
        }}
      >
        <PlayNavigationContext.Provider value={{ openSceneSelect: () => null }}>
          <PlayScene {...scene} colourByPlayer={colourByPlayer} />
        </PlayNavigationContext.Provider>
      </PlayPositionContext.Provider>
    ));

    /*
      monkey-patch scrollToLocation on the sectionList PlayScene holds a
      reference to
    */
    scrollToLocation = jest.fn();
    const sceneLines = queryByTestId("play-scene-lines");
    sceneLines.instance.scrollToLocation = scrollToLocation;
  });
  afterEach(cleanup);

  describe("when act number changes", () => {
    beforeEach(() => {
      const newScene = { ...scene, act: 2 };
      rerender(
        <PlayPositionContext.Provider
          value={{
            activeLine: line,
            activeScene: newScene,
            setActiveLineById: () => null
          }}
        >
          <PlayNavigationContext.Provider
            value={{ openSceneSelect: () => null }}
          >
            <PlayScene {...newScene} colourByPlayer={colourByPlayer} />
          </PlayNavigationContext.Provider>
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
            setActiveLineById: () => null
          }}
        >
          <PlayNavigationContext.Provider
            value={{ openSceneSelect: () => null }}
          >
            <PlayScene {...newScene} colourByPlayer={colourByPlayer} />
          </PlayNavigationContext.Provider>
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
