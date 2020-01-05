import play from "../../data/plays/shakespeare/AComedyOfErrors";

import {
  navigateToPlay,
  openSceneSelect,
  setParams,
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

      expect(navigation.navigate).toHaveBeenCalledWith("PlaySceneSelectModal", {
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
});
