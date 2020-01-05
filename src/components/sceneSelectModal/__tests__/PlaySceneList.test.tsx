import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  GetByAPI,
  RenderAPI,
  shallow,
  fireEvent
} from "react-native-testing-library";
import "jest-styled-components/native";

import PlaySceneList from "../PlaySceneList";
import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { Scene } from "../../../types/play-types";

describe("PlaySceneList", () => {
  let onScenePress: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  let rerender: RenderAPI["rerender"];
  beforeEach(async () => {
    onScenePress = jest.fn();

    ({ queryByText, queryByTestId, getByTestId, rerender } = render(
      <PlaySceneList {...play} onScenePress={onScenePress} />
    ));
  });
  afterEach(cleanup);

  it("renders act header", () => {
    expect(queryByText("ACT 1")).not.toBeNull();
  });

  it("renders scene row correctly", async () => {
    expect(queryByTestId("scene-row-1-1")).not.toBeNull();
  });

  it("renders current scene indicator", () => {
    expect(queryByTestId("current-scene-indicator-1-1")).not.toBeNull();
  });

  it("renders right arrow", () => {
    expect(queryByTestId("right-arrow-1-1"));
  });

  it("sets indicator visible when on current scene", () => {
    const { currentAct, currentScene } = play;
    const indicator = getByTestId(
      `current-scene-indicator-${currentAct}-${currentScene}`
    );
    expect(indicator.props.visible).toEqual(true);
  });

  it("sets indicator invisible when not on current scene", () => {
    const { currentAct, currentScene } = play;
    const scene = play.scenes.find(
      ({ act, scene }) => act !== currentAct || scene !== currentScene
    );
    const indicator = getByTestId(
      `current-scene-indicator-${scene.act}-${scene.scene}`
    );
    expect(indicator.props.visible).toEqual(false);
  });

  it("calls onScenePress with scene and act numbers when row pressed", () => {
    const sceneRow = getByTestId("scene-row-1-1");
    fireEvent.press(sceneRow);

    expect(onScenePress).toHaveBeenCalledWith({
      act: 1,
      scene: 1
    });
  });

  describe("when scenes change", () => {
    let unusedScene: Scene;
    beforeEach(() => {
      const [firstScene, secondScene] = play.scenes;
      const scenes = [firstScene];
      unusedScene = secondScene;

      rerender(
        <PlaySceneList {...play} scenes={scenes} onScenePress={onScenePress} />
      );
    });

    it("rerenders the list", () => {
      const { act, scene } = unusedScene;
      expect(queryByTestId(`scene-row-${act}-${scene}`)).toBeNull();
    });
  });
});
