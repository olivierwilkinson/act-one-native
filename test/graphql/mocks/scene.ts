import { SceneFragment } from "../../../src/graphql/fragments/types/SceneFragment";
import createMockLookup from "./helpers/createMockLookup";

export const scene: SceneFragment = {
  __typename: "Scene",
  id: 10,
  actNum: 1,
  sceneNum: 1,
  playId: null
};

export const otherScene: SceneFragment = {
  __typename: "Scene",
  id: 11,
  actNum: 1,
  sceneNum: 2,
  playId: null
};

export const actTwoScene: SceneFragment = {
  __typename: "Scene",
  id: 12,
  actNum: 2,
  sceneNum: 1,
  playId: null
};

export const sceneById = createMockLookup({
  scene,
  otherScene,
  actTwoScene
});
