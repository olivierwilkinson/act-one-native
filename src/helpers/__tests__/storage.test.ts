import AsyncStorage from "@react-native-community/async-storage";

import { getStoredSettings, setStoredSettings } from "../storage";
import { PlaySettings } from "../../contexts/PlaySettings";
import play from "../../data/plays/shakespeare/AComedyOfErrors";

jest.mock("@react-native-community/async-storage", () => {
  const MockAsyncStorage = require("mock-async-storage").default;
  return new MockAsyncStorage();
});

const settings: PlaySettings = {
  selectedPlayer: "captain hindsight"
};

describe("storage helpers", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  describe("#getStoredSettings", () => {
    it("returns null when no settings stored", async () => {
      const settings = await getStoredSettings(play);

      expect(settings).toBeNull();
    });

    describe("when settings stored", () => {
      beforeEach(() => {
        AsyncStorage.setItem(
          `@${play.title}-settings`,
          JSON.stringify(settings)
        );
      });

      it("returns settings", async () => {
        const storedSettings = await getStoredSettings(play);

        expect(storedSettings).toEqual(settings);
      });
    });
  });

  describe("#setStoredSettings", () => {
    it("sets settings correctly", async () => {
      await setStoredSettings(play, settings);

      const storedSettings = await AsyncStorage.getItem(
        `@${play.title}-settings`
      );
      expect(JSON.parse(storedSettings!)).toEqual(settings);
    });

    describe("when settings stored", () => {
      beforeEach(() => {
        AsyncStorage.setItem(
          `@${play.title}-settings`,
          JSON.stringify(settings)
        );
      });

      it("overwrites settings", async () => {
        const newSettings = { selectedPlayer: "new current player" };
        await setStoredSettings(play, newSettings);

        const storedSettings = await AsyncStorage.getItem(
          `@${play.title}-settings`
        );
        expect(JSON.parse(storedSettings!)).toEqual(newSettings);
      });
    });
  });
});
