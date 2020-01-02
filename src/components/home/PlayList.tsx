import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "./PlayListItem";

import plays from "../../data/plays";
import { Play } from "../../types/play-types";
import { lightGray } from "../../styles/colours";

type Props = {
  goToPlay: (play: Play) => void;
};

export default (props: Props) => (
  <FlatList
    style={{ backgroundColor: lightGray }}
    data={plays}
    renderItem={({ item }: { item: Play }) => (
      <PlayListItem {...item} onPress={() => props.goToPlay(item)} />
    )}
    keyExtractor={item => item.play}
  />
);
