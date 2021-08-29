import React from "react";
import { useQuery } from "@apollo/client";

import PlayList from "./PlayList";
import localPlays from "../../../data/plays";

import GET_PLAY_LIST_CONTAINER from "./GetPlayListContainer.graphql";
import { GetPlayListContainer } from "./types/GetPlayListContainer";
import Placeholder from "../../common/placeholder/Placeholder";
import { StyleProp, ViewStyle } from "react-native";

export type Props = {
  goToPlay: (playId: number) => void;
  style?: StyleProp<ViewStyle>;
};

export default ({ goToPlay, style }: Props) => {
  const { data: { plays = [] } = {}, loading, error, refetch } = useQuery<
    GetPlayListContainer
  >(GET_PLAY_LIST_CONTAINER);

  if (loading || !(plays?.length || localPlays.length)) {
    return (
      <Placeholder
        message={loading ? "Loading scripts..." : "No scripts found"}
        loading={loading}
        error={!!error}
        retry={refetch}
        style={style}
      />
    );
  }

  return <PlayList plays={[...localPlays, ...plays]} goToPlay={goToPlay} />;
};
