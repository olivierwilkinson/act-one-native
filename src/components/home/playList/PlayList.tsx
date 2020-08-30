import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "../playListItem/PlayListItem";

import { lightGray } from "../../../styles/colours";
import { Play } from "../../../types/play-types";

type Props = {
  plays: Play[];
  goToPlay: (play: Play) => void;
};

export default ({ plays, goToPlay }: Props) => (
  <FlatList
    testID="play-list"
    style={{ backgroundColor: lightGray }}
    data={plays}
    renderItem={({ item }: { item: Play }) => (
      <PlayListItem {...item} onPress={() => goToPlay(item)} />
    )}
    keyExtractor={item => item.id.toString()}
  />
);
