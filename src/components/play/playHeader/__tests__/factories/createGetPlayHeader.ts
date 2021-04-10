import { playById } from "../../../../../../test/graphql/mocks/play";
import {
  GetPlayHeader,
  GetPlayHeaderVariables
} from "../../types/GetPlayHeader";

export default function createGetPlayHeader(
  variables: GetPlayHeaderVariables
): GetPlayHeader {
  return { play: playById[variables.id || -1] || null };
}
