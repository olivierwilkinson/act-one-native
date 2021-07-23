/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SceneWhereUniqueInput } from "./../../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetSceneHeader
// ====================================================

export interface GetSceneHeader_scene {
  __typename: "Scene";
  id: number;
  actNum: number;
  sceneNum: number;
}

export interface GetSceneHeader {
  scene: GetSceneHeader_scene | null;
}

export interface GetSceneHeaderVariables {
  where: SceneWhereUniqueInput;
}
