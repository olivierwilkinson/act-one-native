import React from "react";
import { useQuery } from "@apollo/client";

import PlayList from "./PlayList";
import localPlays from "../../../data/plays";

import GET_PLAY_LIST_CONTAINER from "./GetPlayListContainer.graphql";
import { GetPlayListContainer } from "./types/GetPlayListContainer";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = {
  goToPlay: (playId: number) => void;
};

export default ({ goToPlay }: Props) => {
  const { data: { plays = [] } = {}, loading, refetch } = useQuery<
    GetPlayListContainer
  >(GET_PLAY_LIST_CONTAINER);

  if (loading || !(plays?.length || localPlays.length)) {
    return (
      <Placeholder
        message={loading ? "Loading scripts..." : "No scripts found"}
        loading={loading}
        retry={() => refetch()}
      />
    );
  }

  return <PlayList plays={[...localPlays, ...plays]} goToPlay={goToPlay} />;
};
