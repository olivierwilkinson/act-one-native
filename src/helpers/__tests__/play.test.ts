import play from "../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [activeScene]
} = play;
const {
  lines: [line]
} = activeScene;

import { findActiveScene, getLineText, createColourByPlayer } from "../play";
import colourByPlayer from "./data/colourByPlayer.json";

describe("play helpers", () => {
  describe("#findActiveScene", () => {
    it("finds active scene", () => {
      expect(findActiveScene(play)).toEqual(activeScene);
    });

    it("returns first scene when no active scene is found", () => {
      expect(findActiveScene(play, { scene: -1, act: -1 })).toEqual(
        play.scenes[0]
      );
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
      expect(createColourByPlayer(play.scenes)).toEqual(colourByPlayer);
    });
  });
});
