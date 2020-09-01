import React from "react";
import { Text } from "react-native";
import { useQuery } from "@apollo/client";

import PlayList from "./PlayList";
import GET_PLAYS from "../../../graphql/queries/GetPlays.graphql";
import { createColourByPlayer } from "../../../helpers/play";

import { Play } from "../../../types/play-types";
import { GetPlays } from "../../../graphql/queries/types/GetPlays";
import PageLoading from "../../common/pageLoading/PageLoading";

export type Props = {
  plays: Play[];
  goToPlay: (play: Play) => void;
};

export default ({ plays: localPlays, goToPlay }: Props) => {
  const { data: { getPlays: plays } = {}, loading } = useQuery<GetPlays>(
    GET_PLAYS
  );

  if (loading) {
    return <PageLoading />;
  }

  if (!plays?.length && !localPlays.length) {
    return <Text>No Plays</Text>;
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
