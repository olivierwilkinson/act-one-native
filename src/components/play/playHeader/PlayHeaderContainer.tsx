import React, { memo } from "react";

import PlayHeader from "./PlayHeader";
import { PlayNavigationProp } from "../../../types/navigation-types";
import { useQuery } from "@apollo/client";
import GET_PLAY_HEADER from "./GetPlayHeader.graphql";
import { usePlayback } from "../../../contexts/Playback";
import { GetPlayHeader } from "./types/GetPlayHeader";

export type Props = {
  playId?: number;
  navigation: PlayNavigationProp;
  onSettingsPress?: () => void;
};

const PlayHeaderContainer = ({
  playId,
  navigation,
  onSettingsPress
}: Props) => {
  const { stop } = usePlayback();

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
        onSettingsPress && onSettingsPress();
      }}
      navigation={navigation}
    />
  );
};

export default memo(PlayHeaderContainer);
