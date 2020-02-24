import play from "../../data/plays/shakespeare/AComedyOfErrors";

import {
  navigateToPlay,
  openSceneSelect,
  setParams,
  goToScene,
  playScreenKey,
  openPlaySettings
} from "../navigation";
import navigation from "../../../tests/mocks/navigation";
import { PlaySettings } from "../../contexts/PlaySettings";

const settings: PlaySettings = {
  selectedPlayer: "captain hindsight"
};

describe("navigation helpers", () => {
  beforeEach(() => {
    navigation.mockRestore();
  });

  describe("#navigateToPlay", () => {
    it("calls navigate with correct arguments", () => {
      navigateToPlay(navigation, play);

      expect(navigation.navigate).toHaveBeenCalledWith({
        routeName: "Play",
        params: { play },
        key: playScreenKey
      });
    });

    it("calls navigate with correct arguments when settings passed", () => {
      navigateToPlay(navigation, play, settings);

      expect(navigation.navigate).toHaveBeenCalledWith({
        routeName: "Play",
        params: { play, settings },
        key: playScreenKey
      });
    });
  });

  describe("#openSceneSelect", () => {
    it("calls navigate with correct arguments", () => {
      openSceneSelect(navigation, play, settings);

      expect(navigation.navigate).toHaveBeenCalledWith("SceneSelect", {
        play,
        settings
      });
    });
  });

  describe("#openPlaySettings", () => {
    it("calls navigate with correct arguments", () => {
      openPlaySettings(navigation, play, settings);

      expect(navigation.navigate).toHaveBeenCalledWith("PlaySettings", {
        play,
        settings
      });
    });
  });

  describe("#setParams", () => {
    it("calls dispatch with correct arguments", () => {
      const params = { unstructured: "data" };
      setParams(navigation, "fake-key", params);

      expect(navigation.dispatch).toHaveBeenCalledWith({
        key: "fake-key",
        params,
        preserveFocus: true,
        type: "Navigation/SET_PARAMS"
      });
    });
  });

  describe("#goToScene", () => {
    it("does not call setParams when no scene exists at passed index", () => {
      goToScene(navigation, play, {}, -1);

      expect(navigation.dispatch).not.toHaveBeenCalled();
    });

    it("calls setParams with correct arguments", () => {
      goToScene(navigation, play, {}, 1);

      expect(navigation.dispatch).toHaveBeenCalledWith({
        key: playScreenKey,
        params: {
          play,
          settings: {
            act: 1,
            scene: 2
          }
        },
        preserveFocus: true,
        type: "Navigation/SET_PARAMS"
      });
    });
  });
});
