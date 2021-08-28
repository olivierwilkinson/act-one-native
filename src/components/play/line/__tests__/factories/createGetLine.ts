import { lineById } from "../../../../../../test/graphql/mocks/line";
import { GetLine, GetLineVariables } from "../../types/GetLine";

export default function createGetLine(variables: GetLineVariables): GetLine {
  if (!variables.where.id) return { line: null };
  return {
    line: {
      ...lineById[variables.where.id],
      lineRows: []
    }
  };
}
