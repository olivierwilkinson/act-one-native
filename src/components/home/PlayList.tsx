import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "./PlayListItem";

import { Play } from "../../types/play-types";
import { lightGray } from "../../styles/colours";

type Props = {
  plays: Play[];
  goToPlay: (play: Play) => void;
};

export default ({ plays, goToPlay }: Props) => (
  <FlatList
    style={{ backgroundColor: lightGray }}
    data={plays}
    renderItem={({ item }: { item: Play }) => (
      <PlayListItem {...item} onPress={() => goToPlay(item)} />
    )}
    keyExtractor={item => item.play}
  />
);
