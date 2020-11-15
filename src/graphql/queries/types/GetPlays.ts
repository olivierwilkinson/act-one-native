/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlays
// ====================================================

export interface GetPlays_plays_scenes_lines_lineRows {
  __typename: "LineRow";
  id: number;
  lineId: number | null;
  number: number | null;
  text: string;
}

export interface GetPlays_plays_scenes_lines {
  __typename: "Line";
  id: number;
  player: string;
  sceneId: number | null;
  lineRows: GetPlays_plays_scenes_lines_lineRows[];
}

export interface GetPlays_plays_scenes {
  __typename: "Scene";
  actNum: number;
  id: number;
  playId: number | null;
  sceneNum: number;
  lines: GetPlays_plays_scenes_lines[];
}

export interface GetPlays_plays {
  __typename: "Play";
  description: string;
  id: number;
  image: string;
  imageLicenseCode: string;
  imageLicenseUrl: string;
  title: string;
  scenes: GetPlays_plays_scenes[];
}

export interface GetPlays {
  plays: GetPlays_plays[];
}
