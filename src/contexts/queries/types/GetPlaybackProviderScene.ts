/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneWhereUniqueInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetPlaybackProviderScene
// ====================================================

export interface GetPlaybackProviderScene_scene_lines_lineRows {
  __typename: "LineRow";
  id: number;
  index: number;
  text: string;
}

export interface GetPlaybackProviderScene_scene_lines {
  __typename: "Line";
  id: number;
  player: string;
  index: number;
  lineRows: GetPlaybackProviderScene_scene_lines_lineRows[];
}

export interface GetPlaybackProviderScene_scene {
  __typename: "Scene";
  id: number;
  lines: GetPlaybackProviderScene_scene_lines[];
}

export interface GetPlaybackProviderScene {
  scene: GetPlaybackProviderScene_scene | null;
}

export interface GetPlaybackProviderSceneVariables {
  where: SceneWhereUniqueInput;
}
