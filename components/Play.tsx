import React from "react";
import { FlatList } from "react-native";

import PlayLine from "./PlayLine";
import { Play, Line } from "../plays/play";

export default (props: Play) => (
  <FlatList
    data={props.script}
    renderItem={({ item }: { item: Line }) => <PlayLine {...item} />}
    keyExtractor={item => item.id.toString()}
  />
);
