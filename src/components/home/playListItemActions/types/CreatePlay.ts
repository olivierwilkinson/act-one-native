/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayData } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: CreatePlay
// ====================================================

export interface CreatePlay_createPlay {
  __typename: "Play";
  id: number;
  title: string;
}

export interface CreatePlay {
  createPlay: CreatePlay_createPlay | null;
}

export interface CreatePlayVariables {
  play: PlayData;
}
