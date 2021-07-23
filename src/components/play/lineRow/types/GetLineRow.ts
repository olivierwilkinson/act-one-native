/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LineRowWhereUniqueInput } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetLineRow
// ====================================================

export interface GetLineRow_lineRow {
  __typename: "LineRow";
  id: number;
  number: number | null;
  text: string;
}

export interface GetLineRow {
  lineRow: GetLineRow_lineRow | null;
}

export interface GetLineRowVariables {
  where: LineRowWhereUniqueInput;
}
