import { sceneById } from "../../../../../../test/graphql/mocks/scene";
import { GetScene, GetSceneVariables } from "../../types/GetScene";

export default function createGetScene(variables: GetSceneVariables): GetScene {
  if (!variables.where.id) return { scene: null };
  return {
    scene: {
      ...sceneById[variables.where.id],
      lines: []
    }
  };
}
