import React from "react";
import { View, FlatList, Text } from "react-native";
import styled from "styled-components";

import plays from "../plays";
import { Play } from '../plays/play';

export default function PlayList() {
  return (
    <FlatList
      data={plays}
      renderItem={({ item }: { item: Play }) => (
        <View>
          <Text>{item.play}</Text>
        </View>
      )}
      keyExtractor={item => item.play}
    />
  );
}
