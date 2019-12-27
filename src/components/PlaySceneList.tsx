import React, { useState, useEffect } from "react";
import { View, Text, SectionList, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

import { Scene } from "../types/play-types";
import { titleFont, mediumSizeFont } from "../styles/typography";
import { lightPrimaryColour } from "../styles/colours";

type ListSection = {
  title: string;
  data: Scene[];
};

const generateSections: (scenes: Scene[]) => ListSection[] = scenes =>
  scenes.reduce<ListSection[]>(
    (acc, scene) => {
      const latestSection = acc[acc.length - 1];
      const title = `Act ${scene.act}`;

      if (latestSection.title === title) {
        latestSection.data.push(scene);
        return acc;
      }

      return [...acc, { title, data: [scene] }];
    },
    [{ title: `Act 1`, data: [] }]
  );

const ActHeaderView = styled(View)`
  padding: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${lightPrimaryColour};
`;

const ActText = styled(Text)`
  ${titleFont}
  ${mediumSizeFont}
`;

const SceneView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ isCurrentScene }: { isCurrentScene: boolean }) =>
    isCurrentScene ? lightPrimaryColour : "white"};
  padding: 10px 20px;
`;

const SceneText = styled(Text)`
  ${titleFont}
  color: ${({ isCurrentScene }: { isCurrentScene: boolean }) =>
    isCurrentScene ? "white" : "black"};
`;

const RightArrowView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      sections={sections}
      renderSectionHeader={({ section: { title } }) => (
        <ActHeaderView>
          <ActText>{title}</ActText>
        </ActHeaderView>
      )}
      renderItem={({ item: { scene, act } }) => {
        const isCurrentScene = scene === currentScene && act === currentAct;
        return (
          <TouchableHighlight onPress={() => onScenePress({ scene, act })}>
            <SceneView isCurrentScene={isCurrentScene}>
              <SceneText
                isCurrentScene={isCurrentScene}
              >{`SCENE ${scene}`}</SceneText>

              <RightArrowView>
                <Ionicons
                  name="ios-arrow-forward"
                  size={18}
                  color={isCurrentScene ? "white" : "black"}
                />
              </RightArrowView>
            </SceneView>
          </TouchableHighlight>
        );
      }}
      keyExtractor={item => `${item.act}-${item.scene}`}
      stickySectionHeadersEnabled
    />
  );
};
