import React, { memo, useEffect, useRef } from "react";
import { SectionList } from "react-native";

import { playBackgroundColour } from "../../../styles/colours";
import LineContainer from "../line/LineContainer";
import LineHeaderContainer from "../lineHeader/LineHeaderContainer";
import usePrevious from "../../../hooks/usePrevious";

type Props = {
  lineIds: number[];
  actNum: number;
  sceneNum: number;
};

const Scene = ({ lineIds, actNum, sceneNum }: Props) => {
  const previousActNum = usePrevious(actNum);
  const previousSceneNum = usePrevious(sceneNum);
  const sceneElement = useRef<any>(null);

  useEffect(() => {
    if (
      sceneElement &&
      sceneElement.current &&
      previousActNum !== actNum &&
      previousSceneNum !== sceneNum &&
      lineIds.length > 0
    ) {
      sceneElement.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: false
      });
    }
  }, [previousActNum, actNum, previousSceneNum, sceneNum]);

  return (
    <SectionList
      testID="scene-section-list"
      ref={sceneElement}
      style={{ backgroundColor: playBackgroundColour }}
      sections={lineIds.map(lineId => ({ data: [lineId] }))}
      renderItem={({ item: lineId }) => <LineContainer id={lineId} />}
      renderSectionHeader={({
        section: {
          data: [lineId]
        }
      }) => <LineHeaderContainer id={lineId} />}
      keyExtractor={item => item.toString()}
      windowSize={7}
    />
  );
};

export default memo(Scene);
