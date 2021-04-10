import {
  GetPlay,
  GetPlayVariables,
  GetPlay_play_scenes
} from "../../../src/graphql/queries/types/GetPlay";
import { playById } from "../mocks/play";

export default function createGetPlay(
  variables: GetPlayVariables,
  scenes: GetPlay_play_scenes[] = []
): GetPlay {
  const play = playById[variables.where.id || -1];
  if (!play) return { play: null };

  return {
    play: {
      ...play,
      scenes
    }
  };
}
