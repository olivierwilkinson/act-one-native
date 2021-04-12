import { SceneFragment } from "../../../src/graphql/fragments/types/SceneFragment";
import createMockLookup from "./helpers/createMockLookup";

export const scene: SceneFragment = {
  __typename: "Scene",
  id: 10,
  index: 0,
  actNum: 1,
  sceneNum: 1,
  playId: null
};

export const otherScene: SceneFragment = {
  __typename: "Scene",
  id: 11,
  index: 1,
  actNum: 1,
  sceneNum: 2,
  playId: null
};

export const actTwoScene: SceneFragment = {
  __typename: "Scene",
  id: 12,
  index: 2,
  actNum: 2,
  sceneNum: 1,
  playId: null
};

export const sceneById = createMockLookup({
  scene,
  otherScene,
  actTwoScene
});
