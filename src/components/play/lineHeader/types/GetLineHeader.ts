/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LineWhereUniqueInput } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetLineHeader
// ====================================================

export interface GetLineHeader_line {
  __typename: "Line";
  id: number;
  player: string;
}

export interface GetLineHeader {
  line: GetLineHeader_line | null;
}

export interface GetLineHeaderVariables {
  where: LineWhereUniqueInput;
}
