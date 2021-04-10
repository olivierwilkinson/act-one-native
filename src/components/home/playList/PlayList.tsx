import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "../playListItem/PlayListItem";

import { lightGray } from "../../../styles/colours";
import { isPlayFragment } from "../../../types/play-types";
import { LocalPlayData } from "../../../data/plays/types";
import { PlayFragment } from "../../../graphql/fragments/types/PlayFragment";

type Props = {
  plays: (PlayFragment | LocalPlayData)[];
  goToPlay: (playId: number) => void;
};

export default ({ plays, goToPlay }: Props) => (
  <FlatList
    testID="play-list"
    style={{ backgroundColor: lightGray }}
    data={plays}
    renderItem={({ item: play }: { item: PlayFragment | LocalPlayData }) => (
      <PlayListItem
        play={play}
        onPress={() => {
          if (isPlayFragment(play)) {
            goToPlay(play.id);
          }
        }}
      />
    )}
    keyExtractor={(play, i) => {
      if (isPlayFragment(play)) {
        return play.id.toString();
      }
      return (i * -1).toString();
    }}
  />
);
