import play from "../../data/plays/shakespeare/AComedyOfErrors";

import { createPlayNavigation } from "../contexts";
import navigation from "../../../tests/mocks/navigation";
import { PlayNavigation } from "../../contexts/PlayNavigation";
import { openSceneSelect } from "../../helpers/navigation";
import * as PlayHelpers from "../../helpers/play";
import { Play } from "../../types/play-types";

jest.mock("../../helpers/navigation.ts", () => ({
  openSceneSelect: jest.fn()
}));
// @ts-ignore
PlayHelpers.goToScene = jest.fn();

const mockedGoToScene = PlayHelpers.goToScene as jest.Mock;
const mockedOpenSceneSelect = openSceneSelect as jest.Mock;

describe("contexts helpers", () => {
  beforeEach(() => {
    navigation.mockRestore();
  });

  describe("#createPlayNavigation", () => {
    let testPlay: Play;
    let playNavigation: PlayNavigation;
    beforeEach(() => {
      testPlay = {
        ...play,
        currentScene: 2
      };

      playNavigation = createPlayNavigation(navigation, testPlay);
    });
    afterEach(() => {
      mockedGoToScene.mockRestore();
      mockedOpenSceneSelect.mockRestore();
    });

    it("creates goToNextScene correctly", () => {
      expect(playNavigation.goToNextScene).toBeDefined();
      playNavigation.goToNextScene!();

      expect(mockedGoToScene).toHaveBeenLastCalledWith(navigation, testPlay, 2);
    });

    it("creates goToPreviousScene correctly", () => {
      expect(playNavigation.goToPreviousScene).toBeDefined();
      playNavigation.goToPreviousScene!();

      expect(mockedGoToScene).toHaveBeenLastCalledWith(navigation, testPlay, 0);
    });

    it("creates openSceneSelect correctly", () => {
      playNavigation.openSceneSelect();

      expect(mockedOpenSceneSelect).toHaveBeenCalledWith(navigation, testPlay);
    });

    describe("when there is no previous scene", () => {
      beforeEach(() => {
        playNavigation = createPlayNavigation(navigation, {
          ...play,
          currentScene: 1
        });
      });

      it("does not create goToPreviousScene", () => {
        expect(playNavigation.goToPreviousScene).not.toBeDefined();
      });
    });

    describe("when there is no next scene", () => {
      beforeEach(() => {
        playNavigation = createPlayNavigation(navigation, {
          ...play,
          currentAct: 4,
          currentScene: 4
        });
      });

      it("does not create goToNextScene", () => {
        expect(playNavigation.goToNextScene).not.toBeDefined();
      });
    });
  });
});
