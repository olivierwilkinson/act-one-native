import fs from "fs";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [activeScene]
} = play;
const {
  lines: [line]
} = activeScene;

import {
  findActiveScene,
  getLineText,
  createColourByPlayer,
  goToScene
} from "../play";
import { setParams, playScreenKey } from "../navigation";
import { navigationMock } from "../../../tests/mocks";
import colourByPlayer from "./data/colourByPlayer.json";

jest.mock("../navigation.ts", () => ({
  setParams: jest.fn(),
  playScreenKey: "fake-play-screen-key"
}));

const mockedSetParams = setParams as jest.Mock;

describe("play helpers", () => {
  describe("#findActiveScene", () => {
    it("finds active scene", () => {
      expect(findActiveScene(play)).toEqual(activeScene);
    });

    it("returns null when no active scene is found", () => {
      expect(
        findActiveScene({
          ...play,
          currentScene: -1,
          currentAct: -1
        })
      ).toBeUndefined();
    });
  });

  describe("#getLineText", () => {
    it("correctly gets line text", () => {
      expect(getLineText(line)).toEqual(
        "ACT I\nSCENE I. A hall in DUKE SOLINUS'S palace.\nEnter DUKE SOLINUS, AEGEON, Gaoler, Officers, and other Attendants"
      );
    });

    it("returns empty string if line rows is empty", () => {
      expect(getLineText({ id: -1, player: "", lineRows: [] }));
    });
  });

  describe("#createColourByPlayer", () => {
    it("creates colourByPlayer object correctly", () => {
      expect(createColourByPlayer(play)).toEqual(colourByPlayer);
    });
  });

  describe("#goToScene", () => {
    afterEach(() => {
      mockedSetParams.mockRestore();
    });

    it("does not call setParams when no scene exists at passed index", () => {
      goToScene(navigationMock, play, -1);

      expect(mockedSetParams).not.toHaveBeenCalled();
    });

    it("calls setParams with correct arguments", () => {
      goToScene(navigationMock, play, 1);

      expect(mockedSetParams).toHaveBeenCalledWith(
        navigationMock,
        playScreenKey,
        {
          play: {
            ...play,
            currentAct: 1,
            currentScene: 2
          }
        }
      );
    });
  });
});
