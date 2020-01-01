import "react-native";
import React from "react";
import { render, fireEvent, cleanup } from "react-native-testing-library";

import PlaySceneHeader from "../PlaySceneHeader";
import PlayNavigationContext from "../../../contexts/PlayNavigation";

import scene from "../../../../tests/mocks/scene";

describe("PlaySceneHeader", () => {
  let openSceneSelect;
  let queryByText;
  let queryByTestId;
  let getByTestId;
  beforeEach(() => {
    openSceneSelect = jest.fn();

    ({ queryByText, queryByTestId, getByTestId } = render(
      <PlayNavigationContext.Provider value={{ openSceneSelect }}>
        <PlaySceneHeader {...scene} />
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
    let goToPreviousScene;
    beforeEach(() => {
      goToPreviousScene = jest.fn();

      ({ queryByTestId, getByTestId } = render(
        <PlayNavigationContext.Provider
          value={{ openSceneSelect, goToPreviousScene }}
        >
          <PlaySceneHeader {...scene} />
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
    let goToNextScene;
    beforeEach(() => {
      goToNextScene = jest.fn();

      ({ queryByTestId, getByTestId } = render(
        <PlayNavigationContext.Provider
          value={{ openSceneSelect, goToNextScene }}
        >
          <PlaySceneHeader {...scene} />
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
