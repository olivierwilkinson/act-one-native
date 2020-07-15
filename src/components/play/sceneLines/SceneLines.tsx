import React, { useRef, useEffect } from "react";
import { SectionList } from "react-native";

import LineContainer from "../line/LineContainer";
import LineHeaderContainer from "../lineHeader/LineHeaderContainer";
import { Line } from "../../../types/play-types";
import { ColourByPlayer } from "../../../types/colour-types";
import { playBackgroundColour } from "../../../styles/colours";

type Props = {
  lines: Line[];
  act: number;
  scene: number;
  colourByPlayer: ColourByPlayer;
};

export default ({ lines, colourByPlayer, act, scene }: Props) => {
  const sceneElement = useRef<any>(null);

  useEffect(() => {
    if (sceneElement && sceneElement.current) {
      sceneElement.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: false
      });
    }
  }, [act, scene]);

  return (
    <SectionList
      ref={sceneElement}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lines.map(line => ({
        data: [line]
      }))}
      renderItem={({ item: line }) => <LineContainer {...line} />}
      renderSectionHeader={({
        section: {
          data: [line]
        }
      }) => (
        <LineHeaderContainer {...line} colour={colourByPlayer[line.player]} />
      )}
      keyExtractor={item => item.id.toString()}
      windowSize={7}
    />
  );
};
