import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "./PlayListItem";

import plays from "../plays";
import { Play } from "../types/play-types";

type Props = {
  goToPlay: (play: Play) => void;
};

export default (props: Props) => (
  <FlatList
    data={plays}
    renderItem={({ item }: { item: Play }) => (
      <PlayListItem {...item} onClick={() => props.goToPlay(item)} />
    )}
    keyExtractor={item => item.play}
  />
);
