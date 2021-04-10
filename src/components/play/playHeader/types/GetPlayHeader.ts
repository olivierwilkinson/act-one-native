/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayHeader
// ====================================================

export interface GetPlayHeader_play {
  __typename: "Play";
  id: number;
  title: string;
}

export interface GetPlayHeader {
  play: GetPlayHeader_play | null;
}

export interface GetPlayHeaderVariables {
  id: number;
}
