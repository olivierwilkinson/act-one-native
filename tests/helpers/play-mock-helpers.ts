import { Scene } from "../../src/types/play-types";

export const findPlayerLine = ({ lines }: Scene) =>
  lines.find(({ player }) => player);

export const findDirectionLine = ({ lines }: Scene) =>
  lines.find(({ player }) => !player);
