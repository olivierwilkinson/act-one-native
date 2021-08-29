import { line, otherLine } from "../../../test/graphql/mocks/line";
import { lineRow, otherLineRow } from "../../../test/graphql/mocks/lineRow";
import { otherScene, scene } from "../../../test/graphql/mocks/scene";
import {
  findActiveScene,
  getLineText,
  createColourByPlayer,
  findPlayers
} from "../play";
import colourByPlayer from "./data/colourByPlayer.json";

const firstScene = { ...scene, lines: [{ ...line, lineRows: [] }] };
const secondScene = {
  ...otherScene,
  sceneNum: 2,
  actNum: 2,
  lines: [{ ...otherLine, lineRows: [] }]
};

const scenes = [firstScene, secondScene];

describe("play helpers", () => {
  describe("#findActiveScene", () => {
    it("finds active scene", () => {
      expect(findActiveScene(scenes, { sceneNum: 2, actNum: 2 })).toEqual(
        secondScene
      );
    });

    it("returns first scene when no active scene is found", () => {
      expect(findActiveScene(scenes, { sceneNum: -1, actNum: -1 })).toEqual(
        firstScene
      );
    });
  });

  describe("#getLineText", () => {
    it("correctly gets line text", () => {
      expect(
        getLineText({
          ...line,
          lineRows: [lineRow, otherLineRow]
        })
      ).toEqual(`${lineRow.text}\n${otherLineRow.text}`);
    });

    it("returns empty string if line rows is empty", () => {
      expect(
        getLineText({
          ...line,
          lineRows: []
        })
      );
    });
  });

  describe("#createColourByPlayer", () => {
    it("creates colourByPlayer object correctly", () => {
      expect(createColourByPlayer(findPlayers(scenes))).toEqual(colourByPlayer);
    });
  });
});
