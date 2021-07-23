/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LineWhereUniqueInput } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetLine
// ====================================================

export interface GetLine_line_lineRows {
  __typename: "LineRow";
  id: number;
  index: number;
}

export interface GetLine_line {
  __typename: "Line";
  id: number;
  player: string;
  lineRows: GetLine_line_lineRows[];
}

export interface GetLine {
  line: GetLine_line | null;
}

export interface GetLineVariables {
  where: LineWhereUniqueInput;
}
