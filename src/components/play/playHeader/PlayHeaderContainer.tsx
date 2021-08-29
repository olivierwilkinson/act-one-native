import React, { memo } from "react";

import PlayHeader from "./PlayHeader";
import { useQuery } from "@apollo/client";
import GET_PLAY_HEADER from "./GetPlayHeader.graphql";
import { GetPlayHeader } from "./types/GetPlayHeader";

export type Props = {
  playId?: number;
  onBackPress: () => void;
  onSettingsPress?: () => void;
};

const PlayHeaderContainer = ({
  playId,
  onBackPress,
  onSettingsPress
}: Props) => {
  const { data: { play } = {} } = useQuery<GetPlayHeader>(GET_PLAY_HEADER, {
    variables: { id: playId },
    skip: !playId
  });

  return (
    <PlayHeader
      title={play?.title}
      onBackPress={onBackPress}
      onSettingsPress={onSettingsPress}
    />
  );
};

export default memo(PlayHeaderContainer);
