import React from "react";
import { useMutation } from "@apollo/client";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";

import { isPlayFragment } from "../../../types/play-types";
import PlayListItemActions from "./PlayListItemActions";

import CREATE_PLAY from "./CreatePlay.graphql";
import DELETE_PLAY from "./DeletePlay.graphql";
import { CreatePlay, CreatePlayVariables } from "./types/CreatePlay";
import { DeletePlay } from "./types/DeletePlay";
import { useAuth } from "../../../contexts/Auth";
import userIsAdmin from "../../../helpers/userIsAdmin";
import { LocalPlayData } from "../../../data/plays/types";
import { PlayFragment } from "../../../graphql/fragments/types/PlayFragment";

type Props = {
  play: PlayFragment | LocalPlayData;
  style?: StyleProp<ViewStyle>;
};

const PlayListItemActionsContainer = ({ play, style }: Props) => {
  const { user } = useAuth();
  const [createPlay, { loading: creating }] = useMutation<
    CreatePlay,
    CreatePlayVariables
  >(CREATE_PLAY, {
    refetchQueries: ["GetPlayListContainer"],
    awaitRefetchQueries: true,
    onError: console.error
  });
  const [deletePlay, { loading: deleting }] = useMutation<DeletePlay>(
    DELETE_PLAY,
    {
      refetchQueries: ["GetPlayListContainer"],
      awaitRefetchQueries: true,
      onError: console.error
    }
  );

  if (creating || deleting) {
    return <ActivityIndicator size="small" style={style} />;
  }

  return (
    <PlayListItemActions
      showCreateButton={!isPlayFragment(play)}
      showDeleteButton={isPlayFragment(play)}
      onCreatePress={async () => {
        if (isPlayFragment(play)) {
          throw new Error("Trying to create using an existing play");
        }

        const sanitisedPlay = {
          ...play,
          image: play.image.toString()
        };

        await createPlay({
          variables: {
            play: sanitisedPlay
          }
        });
      }}
      onDeletePress={async () => {
        if (!isPlayFragment(play)) {
          throw new Error("Trying to delete a local play");
        }

        await deletePlay({ variables: { id: play.id } });
      }}
      style={style}
    />
  );
};

export default PlayListItemActionsContainer;
