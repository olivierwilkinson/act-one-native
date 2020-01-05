import React, { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { Scene } from "../../types/play-types";
import { mediumSizeFont, subFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";

const ActHeaderView = styled(View)`
  padding: 10px 20px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${lightPrimaryColour};
`;

const ActText = styled(Text)`
  ${mediumSizeFont}
`;

const SceneView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
`;

const SceneInfoView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SceneText = styled(Text)`
  ${subFont}
  padding-left: 10px;
`;

const CurrentSceneIndicator = styled(View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ visible }: { visible: boolean }) =>
    visible ? lightPrimaryColour : "transparent"};
`;

const RightArrowView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ListSection = {
  title: string;
  data: Scene[];
};

const generateSections: (scenes: Scene[]) => ListSection[] = scenes =>
  scenes.reduce<ListSection[]>(
    (acc, scene) => {
      const latestSection = acc[acc.length - 1];
      const title = `ACT ${scene.act}`;

      if (latestSection.title === title) {
        latestSection.data.push(scene);
        return acc;
      }

      return [...acc, { title, data: [scene] }];
    },
    [{ title: `ACT 1`, data: [] }]
  );

type Props = {
  scenes: Scene[];
  currentAct: number;
  currentScene: number;
  onScenePress: (newSceneInfo: { act: number; scene: number }) => void;
};

export default ({ currentAct, currentScene, scenes, onScenePress }: Props) => {
  const [sections, setSections] = useState(generateSections(scenes));

  useEffect(() => setSections(generateSections(scenes)), [scenes]);

  return (
    <SectionList
      bounces={false}
      sections={sections}
      initialNumToRender={scenes.length}
      renderSectionHeader={({ section: { title } }) => (
        <ActHeaderView>
          <ActText>{title}</ActText>
        </ActHeaderView>
      )}
      renderItem={({ item: { scene, act } }) => (
        <TouchableHighlight onPress={() => onScenePress({ scene, act })}>
          <SceneView testID={`scene-row-${scene}-${act}`}>
            <SceneInfoView>
              <CurrentSceneIndicator
                testID={`current-scene-indicator-${act}-${scene}`}
                visible={scene === currentScene && act === currentAct}
              />
              <SceneText>{`SCENE ${scene}`}</SceneText>
            </SceneInfoView>

            <RightArrowView testID={`right-arrow-${scene}-${act}`}>
              <Ionicons name="ios-arrow-forward" size={18} color="grey" />
            </RightArrowView>
          </SceneView>
        </TouchableHighlight>
      )}
      keyExtractor={item => `${item.act}-${item.scene}`}
      stickySectionHeadersEnabled
    />
  );
};
