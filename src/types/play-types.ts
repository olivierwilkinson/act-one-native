import { PlayFragment } from "../graphql/fragments/types/PlayFragment";
import { SceneFragment } from "../graphql/fragments/types/SceneFragment";
import { LineFragment } from "../graphql/fragments/types/LineFragment";
import { LineRowFragment } from "../graphql/fragments/types/LineRowFragment";

export type LineRow = LineRowFragment;
export type Line = LineFragment & { lineRows: LineRow[] };
export type Scene = SceneFragment & { lines: Line[] };
export type Play = PlayFragment & {
  scenes: Scene[];
};

export function isPlayFragment(play: any): play is PlayFragment {
  return !!(
    play.__typename === "Play" &&
    typeof play.id === "number" &&
    typeof play.image === "string" &&
    typeof play.imageLicenseCode === "string" &&
    typeof play.imageLicenseUrl === "string" &&
    typeof play.title === "string"
  );
}
