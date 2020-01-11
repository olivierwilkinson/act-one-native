import play from "../../data/plays/shakespeare/AComedyOfErrors";

import {
  navigateToPlay,
  openSceneSelect,
  setParams,
  goToScene,
  playScreenKey
} from "../navigation";
import navigation from "../../../tests/mocks/navigation";

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
  });

  describe("#openSceneSelect", () => {
    it("calls navigate with correct arguments", () => {
      openSceneSelect(navigation, play);

      expect(navigation.navigate).toHaveBeenCalledWith("SceneSelect", {
        play
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
      goToScene(navigation, play, -1);

      expect(navigation.dispatch).not.toHaveBeenCalled();
    });

    it("calls setParams with correct arguments", () => {
      goToScene(navigation, play, 1);

      expect(navigation.dispatch).toHaveBeenCalledWith({
        key: playScreenKey,
        params: {
          play: {
            ...play,
            currentAct: 1,
            currentScene: 2
          }
        },
        preserveFocus: true,
        type: "Navigation/SET_PARAMS"
      });
    });
  });
});
