import { LineRowFragment } from "../../../src/graphql/fragments/types/LineRowFragment";
import createMockLookup from "./helpers/createMockLookup";

export const lineRow: LineRowFragment = {
  __typename: "LineRow",
  id: 30,
  index: 0,
  number: 1,
  lineId: -1,
  text: "Line in a play no one will read"
};

export const otherLineRow: LineRowFragment = {
  __typename: "LineRow",
  id: 31,
  index: 1,
  number: 2,
  lineId: -1,
  text: "Other line in a play no one will read"
};

export const sceneDirectionLineRow: LineRowFragment = {
  __typename: "LineRow",
  id: 32,
  index: 2,
  number: null,
  lineId: -1,
  text: "Exeunt"
};

export const lineRowById = createMockLookup({
  lineRow,
  otherLineRow,
  sceneDirectionLineRow
});
