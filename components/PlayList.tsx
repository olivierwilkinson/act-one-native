import React from "react";
import { FlatList } from "react-native";

import PlayListItem from "./PlayListItem";

import plays from "../plays";
import { Play } from "../plays/play";

type Props = {
  goToPlay: (Play) => void,
};

export default (props: Props) => (
  <FlatList
    data={plays}
    renderItem={({ item }: { item: Play }) => (
      <PlayListItem
        {...item}
        onClick={() => props.goToPlay(item)}
      />
    )}
    keyExtractor={item => item.play}
  />
);
