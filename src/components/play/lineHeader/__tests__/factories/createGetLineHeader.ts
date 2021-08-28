import { lineById } from "../../../../../../test/graphql/mocks/line";
import {
  GetLineHeader,
  GetLineHeaderVariables
} from "../../types/GetLineHeader";

export default function createGetLineHeader(
  variables: GetLineHeaderVariables
): GetLineHeader {
  if (!variables.where.id) return { line: null };
  return {
    line: lineById[variables.where.id]
  };
}
