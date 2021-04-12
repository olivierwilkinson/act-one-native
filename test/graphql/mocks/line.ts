import { LineFragment } from "../../../src/graphql/fragments/types/LineFragment";
import createMockLookup from "./helpers/createMockLookup";

export const line: LineFragment = {
  __typename: "Line",
  id: 20,
  index: 0,
  player: "Hamlet",
  sceneId: -1
};

export const otherLine: LineFragment = {
  __typename: "Line",
  id: 21,
  index: 1,
  player: "Captain Hindsight",
  sceneId: -1
};

export const lineById = createMockLookup({
  line,
  otherLine
});
