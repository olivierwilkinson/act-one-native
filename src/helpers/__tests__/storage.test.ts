import AsyncStorage from "@react-native-community/async-storage";

import { getStoredSettings, setStoredSettings } from "../storage";
import { PlaySettings } from "../../contexts/PlaySettings";
import { play } from "../../../test/graphql/mocks/play";

const settings: PlaySettings = {
  selectedPlayer: "captain hindsight"
};

describe("storage helpers", () => {
  describe("#getStoredSettings", () => {
    it("returns null when no settings stored", async () => {
      const settings = await getStoredSettings(play.id);

      expect(settings).toBeNull();
    });

    describe("when settings stored", () => {
      beforeEach(() => {
        AsyncStorage.setItem(`@${play.id}-settings`, JSON.stringify(settings));
      });

      it("returns settings", async () => {
        const storedSettings = await getStoredSettings(play.id);

        expect(storedSettings).toEqual(settings);
      });
    });
  });

  describe("#setStoredSettings", () => {
    it("sets settings correctly", async () => {
      await setStoredSettings(play.id, settings);

      const storedSettings = await AsyncStorage.getItem(`@${play.id}-settings`);
      expect(JSON.parse(storedSettings!)).toEqual(settings);
    });

    describe("when settings stored", () => {
      beforeEach(() => {
        AsyncStorage.setItem(`@${play.id}-settings`, JSON.stringify(settings));
      });

      it("overwrites settings", async () => {
        const newSettings = { selectedPlayer: "new current player" };
        await setStoredSettings(play.id, newSettings);

        const storedSettings = await AsyncStorage.getItem(
          `@${play.id}-settings`
        );
        expect(JSON.parse(storedSettings!)).toEqual(newSettings);
      });
    });
  });
});
