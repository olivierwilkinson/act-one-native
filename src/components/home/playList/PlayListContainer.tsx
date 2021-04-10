import React from "react";
import { useQuery } from "@apollo/client";

import PlayList from "./PlayList";
import GET_PLAYS from "../../../graphql/queries/GetPlays.graphql";
import localPlays from "../../../data/plays";

import { GetPlays } from "../../../graphql/queries/types/GetPlays";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = {
  goToPlay: (playId: number) => void;
};

export default ({ goToPlay }: Props) => {
  const { data: { plays = [] } = {}, loading, refetch } = useQuery<GetPlays>(
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

  return <PlayList plays={[...localPlays, ...plays]} goToPlay={goToPlay} />;
};
