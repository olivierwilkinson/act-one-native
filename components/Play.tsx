import React from "react";
import { FlatList } from "react-native";

import PlayLine from "./PlayLine";
import { Play, Line } from "../types/play-types";

export default (props: Play) => (
  <FlatList
    data={props.script}
    renderItem={({ item }: { item: Line }) => <PlayLine {...item} />}
    keyExtractor={item => item.id.toString()}
  />
);
