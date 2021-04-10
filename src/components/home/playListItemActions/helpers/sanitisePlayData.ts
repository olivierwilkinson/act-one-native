import { Play } from "../../../../types/play-types";

export default ({ id, title, ...play }: Play) => ({
  ...play,
  title,
  image: "TBD",
  scenes: play.scenes.map(({ id, actNum, sceneNum, ...sceneData }) => ({
    ...sceneData,
    actNum,
    sceneNum,
    lines: sceneData.lines.map(({ id, ...lineData }) => ({
      ...lineData,
      lineRows: lineData.lineRows.map(({ id, ...lineRow }) => ({
        ...lineRow
      }))
    }))
  }))
});
