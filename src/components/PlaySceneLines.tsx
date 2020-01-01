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
      testID="play-scene-lines"
      ref={ref}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lines.map(line => ({
        data: [line]
      }))}
      renderItem={({ item: line }) => <PlayLine {...line} />}
      renderSectionHeader={({
        section: {
          data: [line]
        }
      }) => <PlayLineHeader {...line} colour={colourByPlayer[line.player]} />}
      keyExtractor={item => item.id.toString()}
    />
  )
);
