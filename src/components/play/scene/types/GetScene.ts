/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneWhereUniqueInput } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetScene
// ====================================================

export interface GetScene_scene_lines {
  __typename: "Line";
  id: number;
  index: number;
}

export interface GetScene_scene {
  __typename: "Scene";
  id: number;
  actNum: number;
  sceneNum: number;
  lines: GetScene_scene_lines[];
}

export interface GetScene {
  scene: GetScene_scene | null;
}

export interface GetSceneVariables {
  where: SceneWhereUniqueInput;
}
