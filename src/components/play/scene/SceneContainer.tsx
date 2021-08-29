import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

import Scene from "./Scene";
import { usePlayPosition } from "../../../contexts/PlayPosition";
import GET_SCENE from "./GetScene.graphql";
import { GetScene, GetSceneVariables } from "./types/GetScene";
import Placeholder from "../../common/placeholder/Placeholder";

export default () => {
  const { activeSceneId } = usePlayPosition();

  const { data, loading, error, refetch } = useQuery<
    GetScene,
    GetSceneVariables
  >(GET_SCENE, {
    variables: { where: { id: activeSceneId } },
    skip: !activeSceneId
  });

  const lineIds = useMemo(
    () =>
      [...(data?.scene?.lines || [])]
        .sort((a, b) => a.index - b.index)
        .map(line => line.id),
    [data?.scene?.lines]
  );

  if (!data?.scene) {
    const showLoading = !activeSceneId || loading;
    return (
      <Placeholder
        loading={showLoading}
        message={showLoading ? "Loading scene..." : "Unable to load scene"}
        error={!!error}
        retry={refetch}
      />
    );
  }

  return (
    <Scene
      lineIds={lineIds}
      actNum={data.scene.actNum}
      sceneNum={data.scene.sceneNum}
    />
  );
};
