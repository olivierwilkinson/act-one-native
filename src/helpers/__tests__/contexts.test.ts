import play from "../../data/plays/shakespeare/AComedyOfErrors";

import { createPlayNavigation } from "../contexts";
import navigation from "../../../test/mocks/navigation";
import { PlayNavigation } from "../../contexts/PlayNavigation";
import { PlaySettings } from "../../contexts/PlaySettings";

describe("contexts helpers", () => {
  beforeEach(() => {
    navigation.mockRestore();
  });

  describe("#createPlayNavigation", () => {
    let settings: PlaySettings;
    let setSettings: jest.Mock;
    let playNavigation: PlayNavigation;
    let setSceneSelectModalOpen: () => void;
    beforeEach(() => {
      settings = { actNum: 1, sceneNum: 2 };
      setSettings = jest.fn();
      setSceneSelectModalOpen = jest.fn();

      playNavigation = createPlayNavigation(
        play,
        settings,
        setSettings,
        setSceneSelectModalOpen
      );
    });

    it("creates goToNextScene correctly", () => {
      expect(playNavigation.goToNextScene).toBeDefined();
      playNavigation.goToNextScene!();

      expect(setSettings).toHaveBeenLastCalledWith({
        sceneNum: 1,
        actNum: 2
      });
    });

    it("creates goToPreviousScene correctly", () => {
      expect(playNavigation.goToPreviousScene).toBeDefined();
      playNavigation.goToPreviousScene!();

      expect(setSettings).toHaveBeenLastCalledWith({
        sceneNum: 1,
        actNum: 1
      });
    });

    describe("when there is no previous scene", () => {
      beforeEach(() => {
        settings = { actNum: 1, sceneNum: 1 };

        playNavigation = createPlayNavigation(
          play,
          settings,
          setSettings,
          setSceneSelectModalOpen
        );
      });

      it("does not create goToPreviousScene", () => {
        expect(playNavigation.goToPreviousScene).not.toBeDefined();
      });
    });

    describe("when there is no next scene", () => {
      beforeEach(() => {
        const finalScene = [...play.scenes].pop();
        settings = {
          actNum: finalScene!.actNum,
          sceneNum: finalScene!.sceneNum
        };

        playNavigation = createPlayNavigation(
          play,
          settings,
          setSettings,
          setSceneSelectModalOpen
        );
      });

      it("does not create goToNextScene", () => {
        expect(playNavigation.goToNextScene).not.toBeDefined();
      });
    });
  });
});
