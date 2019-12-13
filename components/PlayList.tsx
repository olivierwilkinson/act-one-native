import React from "react";
import { View, FlatList, Text } from "react-native";
import styled from "styled-components";

import PlayListItem from './PlayListItem';

import plays from "../plays";
import Play from '../plays/play';

export default function PlayList() {
  return (
    <FlatList
      data={plays}
      renderItem={({ item }: { item: Play }) => (
        <PlayListItem
          {...item}
          onClick={() => console.log('go to play ', item.play)}
        />
      )}
      keyExtractor={item => item.play}
    />
  );
}
