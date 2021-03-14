import React from "react";
import { useQuery } from "@apollo/client";

import PlayList from "./PlayList";
import GET_PLAYS from "../../../graphql/queries/GetPlays.graphql";
import { createColourByPlayer } from "../../../helpers/play";

import { Play } from "../../../types/play-types";
import { GetPlays } from "../../../graphql/queries/types/GetPlays";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = {
  plays?: Play[];
  goToPlay: (play: Play) => void;
};

export default ({ plays: localPlays = [], goToPlay }: Props) => {
  const { data: { plays } = {}, loading, refetch } = useQuery<GetPlays>(
    GET_PLAYS
  );

  if (loading || !(plays?.length || localPlays.length)) {
    return (
      <Placeholder
        message={loading ? "Loading scripts..." : "No scripts found"}
        loading={loading}
        retry={() => refetch()}
      />
    );
  }

  return (
    <PlayList
      plays={[
        ...localPlays,
        ...(plays || []).map(play => {
          const formattedPlay = {
            ...play,
            play: play.title,
            image: "TBD",
            scenes: play.scenes.map(scene => ({
              ...scene,
              scene: scene.sceneNum,
              act: scene.sceneNum
            }))
          };

          return {
            ...formattedPlay,
            colourByPlayer: createColourByPlayer(formattedPlay.scenes)
          };
        })
      ]}
      goToPlay={goToPlay}
    />
  );
};
