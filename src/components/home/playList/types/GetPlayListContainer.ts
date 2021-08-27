/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlayListContainer
// ====================================================

export interface GetPlayListContainer_plays {
  __typename: "Play";
  description: string;
  id: number;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  title: string;
}

export interface GetPlayListContainer {
  plays: GetPlayListContainer_plays[];
}
