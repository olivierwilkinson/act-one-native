/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlayWhereUniqueInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetPlay
// ====================================================

export interface GetPlay_play_scenes_lines_lineRows {
  __typename: "LineRow";
  id: number;
  lineId: number | null;
  number: number | null;
  text: string;
}

export interface GetPlay_play_scenes_lines {
  __typename: "Line";
  id: number;
  player: string;
  sceneId: number | null;
  lineRows: GetPlay_play_scenes_lines_lineRows[];
}

export interface GetPlay_play_scenes {
  __typename: "Scene";
  actNum: number;
  id: number;
  playId: number | null;
  sceneNum: number;
  lines: GetPlay_play_scenes_lines[];
}

export interface GetPlay_play {
  __typename: "Play";
  description: string;
  id: number;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  title: string;
  scenes: GetPlay_play_scenes[];
}

export interface GetPlay {
  play: GetPlay_play | null;
}

export interface GetPlayVariables {
  where: PlayWhereUniqueInput;
}
