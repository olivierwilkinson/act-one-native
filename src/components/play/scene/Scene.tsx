import React, { memo, useEffect, useRef } from "react";

import { SectionList } from "react-native";
import { playBackgroundColour } from "../../../styles/colours";
import LineContainer from "../line/LineContainer";
import LineHeaderContainer from "../lineHeader/LineHeaderContainer";

type Props = {
  lineIds: number[];
  actNum: number;
  sceneNum: number;
};

const Scene = ({ lineIds, actNum, sceneNum }: Props) => {
  const sceneElement = useRef<any>(null);

  useEffect(() => {
    if (
      sceneElement &&
      sceneElement.current &&
      actNum !== -1 &&
      sceneNum !== -1
    ) {
      sceneElement.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: false,
      });
    }
  }, [actNum, sceneNum]);

  return (
    <SectionList
      ref={sceneElement}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lineIds.map((lineId) => ({ data: [lineId] }))}
      renderItem={({ item: lineId }) => <LineContainer id={lineId} />}
      renderSectionHeader={({
        section: {
          data: [lineId],
        },
      }) => <LineHeaderContainer id={lineId} />}
      keyExtractor={(item) => item.toString()}
      windowSize={7}
    />
  );
};

export default memo(Scene);
