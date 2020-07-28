import "react-native";
import React from "react";
import {
  render,
  QueryByAPI,
  GetByAPI,
  RenderAPI,
  fireEvent
} from "react-native-testing-library";

import SceneList from "../SceneList";
import { Scene } from "../../../../types/play-types";
import play from "../../../../data/plays/shakespeare/AComedyOfErrors";

describe("SceneList", () => {
  let onScenePress: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  let rerender: RenderAPI["rerender"];
  beforeEach(async () => {
    onScenePress = jest.fn();

    ({ queryByText, queryByTestId, getByTestId, rerender } = render(
      <SceneList
        {...play}
        activeScene={play.scenes[0]}
        onScenePress={onScenePress}
      />
    ));
  });

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
    const indicator = getByTestId(`current-scene-indicator-1-1`);
    expect(indicator.props.visible).toEqual(true);
  });

  it("sets indicator invisible when not on current scene", () => {
    const { act, scene } = play.scenes.find(
      ({ act, scene }) => act !== 1 || scene !== 1
    ) as Scene;

    const indicator = getByTestId(`current-scene-indicator-${act}-${scene}`);
    expect(indicator.props.visible).toEqual(false);
  });

  it("calls onScenePress with scene and act numbers when row pressed", () => {
    const [firstScene] = play.scenes;
    const sceneRow = getByTestId("scene-row-1-1");
    fireEvent.press(sceneRow);

    expect(onScenePress).toHaveBeenCalledWith(firstScene);
  });

  describe("when scenes change", () => {
    let unusedScene: Scene;
    beforeEach(() => {
      const [firstScene, secondScene] = play.scenes;
      const scenes = [firstScene];
      unusedScene = secondScene;

      rerender(
        <SceneList
          {...play}
          activeScene={firstScene}
          scenes={scenes}
          onScenePress={onScenePress}
        />
      );
    });

    it("rerenders the list", () => {
      const { act, scene } = unusedScene;
      expect(queryByTestId(`scene-row-${act}-${scene}`)).toBeNull();
    });
  });
});
