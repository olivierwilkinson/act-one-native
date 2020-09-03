/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  displayName: string | null;
  googleId: string | null;
  picture: string | null;
  email: string | null;
}

export interface GetUser {
  user: GetUser_user | null;
}
