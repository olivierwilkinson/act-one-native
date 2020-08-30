import React from "react";
import { useMutation } from "@apollo/client";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";

import { Play } from "../../../types/play-types";
import PlayListItemActions from "./PlayListItemActions";
import sanitisePlayData from "./helpers/sanitisePlayData";

import CREATE_PLAY from "./CreatePlay.graphql";
import DELETE_PLAY from "./DeletePlay.graphql";
import { CreatePlay } from "./types/CreatePlay";
import { DeletePlay } from "./types/DeletePlay";

type Props = {
  play: Play;
  style?: StyleProp<ViewStyle>;
};

const PlayListItemActionsContainer = ({ play, style }: Props) => {
  const [createPlay, { loading: creating }] = useMutation<CreatePlay>(
    CREATE_PLAY,
    {
      refetchQueries: ["GetPlays"],
      awaitRefetchQueries: true,
      onError: console.error
    }
  );
  const [deletePlay, { loading: deleting }] = useMutation<DeletePlay>(
    DELETE_PLAY,
    {
      refetchQueries: ["GetPlays"],
      awaitRefetchQueries: true,
      onError: console.error
    }
  );

  if (creating || deleting) {
    return <ActivityIndicator size="large" style={style} />;
  }

  return (
    <PlayListItemActions
      showCreateButton={!!play.local}
      onCreatePress={async () => {
        const { data } = await createPlay({
          variables: { play: sanitisePlayData(play) }
        });
        console.log("Play created:", data?.createPlay?.id);
      }}
      onDeletePress={async () => {
        await deletePlay({ variables: { id: play.id } });
        console.log("Play deleted:", play.id);
      }}
      style={style}
    />
  );
};

export default PlayListItemActionsContainer;
