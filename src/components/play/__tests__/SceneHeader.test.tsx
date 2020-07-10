import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI,
  GetByAPI
} from "react-native-testing-library";

import SceneHeader from "../SceneHeader";
import PlayNavigationContext from "../../../contexts/PlayNavigation";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [scene]
} = play;

describe("SceneHeader", () => {
  let openSceneSelect: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  beforeEach(() => {
    openSceneSelect = jest.fn();

    ({ queryByText, queryByTestId, getByTestId } = render(
      <PlayNavigationContext.Provider value={{ openSceneSelect }}>
        <SceneHeader {...scene} />
      </PlayNavigationContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("renders act and scene title", () => {
    expect(
      queryByText(`ACT ${scene.act} - SCENE ${scene.scene}`)
    ).not.toBeNull();
  });

  it("calls goToSceneSelect when scene select button pressed", () => {
    const sceneSelectButton = queryByTestId("scene-select-button");
    fireEvent.press(sceneSelectButton);

    expect(openSceneSelect).toHaveBeenCalled();
  });

  it("does not render previous scene button", () => {
    expect(queryByTestId("previous-scene-button")).toBeNull();
  });

  it("does not render next scene button", () => {
    expect(queryByTestId("next-scene-button")).toBeNull();
  });

  describe("when goToPreviousScene exists", () => {
    let goToPreviousScene: jest.Mock;
    beforeEach(() => {
      goToPreviousScene = jest.fn();

      ({ queryByTestId, getByTestId } = render(
        <PlayNavigationContext.Provider
          value={{ goToPreviousScene, openSceneSelect }}
        >
          <SceneHeader {...scene} />
        </PlayNavigationContext.Provider>
      ));
    });

    it("renders previous scene button", () => {
      expect(queryByTestId("previous-scene-button")).not.toBeNull();
    });

    it("calls goToPreviousScene when previous scene button pressed", () => {
      const previousSceneButton = getByTestId("previous-scene-button");
      fireEvent.press(previousSceneButton);

      expect(goToPreviousScene).toHaveBeenCalled();
    });

    it("does not render next scene button", () => {
      expect(queryByTestId("next-scene-button")).toBeNull();
    });
  });

  describe("when goToNextScene exists", () => {
    let goToNextScene: jest.Mock;
    beforeEach(() => {
      goToNextScene = jest.fn();

      ({ queryByTestId, getByTestId } = render(
        <PlayNavigationContext.Provider
          value={{ goToNextScene, openSceneSelect }}
        >
          <SceneHeader {...scene} />
        </PlayNavigationContext.Provider>
      ));
    });

    it("renders next scene button", () => {
      expect(queryByTestId("next-scene-button")).not.toBeNull();
    });

    it("calls goToNextScene when next scene button pressed", () => {
      const nextSceneButton = getByTestId("next-scene-button");
      fireEvent.press(nextSceneButton);

      expect(goToNextScene).toHaveBeenCalled();
    });

    it("does not render previous scene button", () => {
      expect(queryByTestId("previous-scene-button")).toBeNull();
    });
  });
});
