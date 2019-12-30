import React, { forwardRef, Component } from "react";
import { SectionList } from "react-native";

import PlayLine from "./PlayLine";
import PlayLineHeader from "./PlayLineHeader";
import { Scene, Line } from "../types/play-types";
import { ColourByPlayer } from "../types/colour-types";
import { playBackgroundColour } from "../styles/colours";

type Props = Scene & {
  colourByPlayer: ColourByPlayer;
};

type ListData = {
  data: Line[];
  title: string;
}[];

export default forwardRef<Component<{ sections: ListData }>, Props>(
  ({ lines, colourByPlayer }: Props, ref) => (
    <SectionList
      ref={ref}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lines.map(line => ({
        data: [line]
      }))}
      renderItem={({ item: line }) => <PlayLine {...line} />}
      renderSectionHeader={({
        section: {
          data: [{ player, id }]
        }
      }) => (
        <PlayLineHeader
          player={player}
          colour={colourByPlayer[player]}
          lineId={id}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  )
);
