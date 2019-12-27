import React from "react";
import { SectionList } from "react-native";

import PlayLine from "./PlayLine";
import PlayLineHeader from "./PlayLineHeader";
import { Scene } from "../types/play-types";

type Props = Scene & {
  colourByPlayer: { [player: string]: number[] };
};

export default ({ lines, colourByPlayer }: Props) => (
  <SectionList
    sections={lines.map(line => ({
      data: [line],
      title: line.player
    }))}
    renderItem={({ item: line }) => <PlayLine {...line} />}
    renderSectionHeader={({ section: { title: player } }) => (
      <PlayLineHeader player={player} colour={colourByPlayer[player]} />
    )}
    keyExtractor={item => item.id.toString()}
  />
);
