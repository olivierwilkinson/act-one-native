import play from "../../data/plays/shakespeare/AComedyOfErrors";

import { createPlayNavigation } from "../contexts";
import navigation from "../../../tests/mocks/navigation";
import { PlayNavigation } from "../../contexts/PlayNavigation";
import { goToScene, openSceneSelect } from "../../helpers/navigation";
import { Play } from "../../types/play-types";
import { PlaySettings } from "../../contexts/PlaySettings";

jest.mock("../../helpers/navigation.ts", () => ({
  goToScene: jest.fn(),
  openSceneSelect: jest.fn()
}));

const mockedGoToScene = goToScene as jest.Mock;
const mockedOpenSceneSelect = openSceneSelect as jest.Mock;

describe("contexts helpers", () => {
  beforeEach(() => {
    navigation.mockRestore();
  });

  describe("#createPlayNavigation", () => {
    let settings: PlaySettings;
    let playNavigation: PlayNavigation;
    beforeEach(() => {
      settings = { act: 1, scene: 2 };

      playNavigation = createPlayNavigation(navigation, play, settings);
    });
    afterEach(() => {
      mockedGoToScene.mockRestore();
      mockedOpenSceneSelect.mockRestore();
    });

    it("creates goToNextScene correctly", () => {
      expect(playNavigation.goToNextScene).toBeDefined();
      playNavigation.goToNextScene!();

      expect(mockedGoToScene).toHaveBeenLastCalledWith(navigation, play, settings, 2);
    });

    it("creates goToPreviousScene correctly", () => {
      expect(playNavigation.goToPreviousScene).toBeDefined();
      playNavigation.goToPreviousScene!();

      expect(mockedGoToScene).toHaveBeenLastCalledWith(navigation, play, settings, 0);
    });

    it("creates openSceneSelect correctly", () => {
      playNavigation.openSceneSelect();

      expect(mockedOpenSceneSelect).toHaveBeenCalledWith(navigation, play, settings);
    });

    describe("when there is no previous scene", () => {
      beforeEach(() => {
        settings = { act: 1, scene: 1 };

        playNavigation = createPlayNavigation(navigation, play, settings);
      });

      it("does not create goToPreviousScene", () => {
        expect(playNavigation.goToPreviousScene).not.toBeDefined();
      });
    });

    describe("when there is no next scene", () => {
      beforeEach(() => {
        const finalScene = [...play.scenes].pop();
        settings = {
          act: finalScene!.act,
          scene: finalScene!.scene
        };

        playNavigation = createPlayNavigation(navigation, play, settings);
      });

      it("does not create goToNextScene", () => {
        expect(playNavigation.goToNextScene).not.toBeDefined();
      });
    });
  });
});
