import React, { forwardRef, Ref } from "react";
import { SectionList } from "react-native";

import Line from "./Line";
import LineHeader from "./LineHeader";
import { Scene } from "../../types/play-types";
import { ColourByPlayer } from "../../types/colour-types";
import { playBackgroundColour } from "../../styles/colours";

type Props = Scene & {
  colourByPlayer: ColourByPlayer;
};

export default forwardRef(
  ({ lines, colourByPlayer }: Props, ref?: Ref<any>) => (
    <SectionList
      testID="play-scene-lines"
      ref={ref}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lines.map(line => ({
        data: [line]
      }))}
      renderItem={({ item: line }) => <Line {...line} />}
      renderSectionHeader={({
        section: {
          data: [line]
        }
      }) => <LineHeader {...line} colour={colourByPlayer[line.player]} />}
      keyExtractor={item => item.id.toString()}
    />
  )
);
