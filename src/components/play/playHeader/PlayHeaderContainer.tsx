import React, { memo, useContext } from "react";

import PlayHeader from "./PlayHeader";
import { PlayNavigationProp } from "../../../types/navigation-types";
import { useQuery } from "@apollo/client";
import GET_PLAY_HEADER from "./GetPlayHeader.graphql";
import Playback from "../../../contexts/Playback";
import { usePlaySettings } from "../../../contexts/PlaySettings";
import { GetPlayHeader } from "./types/GetPlayHeader";

export type Props = {
  playId?: number;
  navigation: PlayNavigationProp;
};

const PlayHeaderContainer = ({ playId, navigation }: Props) => {
  const { stop } = useContext(Playback);
  const { openSettings } = usePlaySettings()

  const { data: { play } = {} } = useQuery<GetPlayHeader>(GET_PLAY_HEADER, {
    variables: { id: playId },
    skip: !playId
  });

  return (
    <PlayHeader
      title={play?.title}
      onBackPress={() => navigation.pop()}
      onSettingsPress={() => {
        stop();
        openSettings();
      }}
      navigation={navigation}
    />
  );
};

export default memo(PlayHeaderContainer);
