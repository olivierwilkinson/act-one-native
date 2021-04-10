/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlays
// ====================================================

export interface GetPlays_plays {
  __typename: "Play";
  description: string;
  id: number;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  title: string;
}

export interface GetPlays {
  plays: GetPlays_plays[];
}
