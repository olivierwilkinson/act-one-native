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
    beforeEach(() => {
      settings = { act: 1, scene: 2 };
      setSettings = jest.fn();

      playNavigation = createPlayNavigation(play, settings, setSettings);
    });

    it("creates goToNextScene correctly", () => {
      expect(playNavigation.goToNextScene).toBeDefined();
      playNavigation.goToNextScene!();

      expect(setSettings).toHaveBeenLastCalledWith({
        scene: 1,
        act: 2
      });
    });

    it("creates goToPreviousScene correctly", () => {
      expect(playNavigation.goToPreviousScene).toBeDefined();
      playNavigation.goToPreviousScene!();

      expect(setSettings).toHaveBeenLastCalledWith({
        scene: 1,
        act: 1
      });
    });

    describe("when there is no previous scene", () => {
      beforeEach(() => {
        settings = { act: 1, scene: 1 };

        playNavigation = createPlayNavigation(play, settings, setSettings);
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

        playNavigation = createPlayNavigation(play, settings, setSettings);
      });

      it("does not create goToNextScene", () => {
        expect(playNavigation.goToNextScene).not.toBeDefined();
      });
    });
  });
});
