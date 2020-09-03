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
import { useAuth } from "../../app/authProvider/AuthProvider";
import userIsAdmin from "../../../helpers/userIsAdmin";

type Props = {
  play: Play;
  style?: StyleProp<ViewStyle>;
};

const PlayListItemActionsContainer = ({ play, style }: Props) => {
  const { user } = useAuth();
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
      showCreateButton={!!(play.local && userIsAdmin(user))}
      showDeleteButton={!!(!play.local && userIsAdmin(user))}
      onCreatePress={async () => {
        await createPlay({
          variables: { play: sanitisePlayData(play) }
        });
      }}
      onDeletePress={async () => {
        await deletePlay({ variables: { id: play.id } });
      }}
      style={style}
    />
  );
};

export default PlayListItemActionsContainer;
