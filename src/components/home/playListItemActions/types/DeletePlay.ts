/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePlay
// ====================================================

export interface DeletePlay_deletePlay {
  __typename: "Play";
  id: number;
  title: string;
}

export interface DeletePlay {
  deletePlay: DeletePlay_deletePlay | null;
}

export interface DeletePlayVariables {
  id: number;
}
