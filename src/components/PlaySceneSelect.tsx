import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  TouchableHighlight
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationStackProp } from "react-navigation-stack";
import styled from "styled-components";

import { Play, Scene } from "../types/play-types";
import { titleFont, mediumSizeFont, bigSizeFont } from "../styles/typography";
import { primaryColour, lightPrimaryColour } from "../styles/colours";

const generateActList = (play: Play) =>
  play.script.reduce<Act[]>(
    (acc, scene) => {
      const latestAct = acc[acc.length - 1];
      if (latestAct.act === scene.act) {
        latestAct.scenes = [...latestAct.scenes, scene];
        return acc;
      }
      return [...acc, { act: scene.act, scenes: [scene] }];
    },
    [{ act: 1, scenes: [] }]
  );

const HeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled(Text)`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

const HeaderSideView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 60px;
`;

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

type Props = Play & {
  act: number;
  scene: number;
  navigation: NavigationStackProp;
};

type Act = {
  act: number;
  scenes: Scene[];
};

export default (props: Props) => {
  const { act: currentAct, scene: currentScene, navigation, ...play } = props;
  const actList = generateActList(play);

  return (
    <SafeAreaView style={{ backgroundColor: primaryColour }}>
      <HeaderView>
        <HeaderSideView />

        <TitleView>
          <TitleText>Select Scene</TitleText>
        </TitleView>

        <TouchableHighlight
          underlayColor={primaryColour}
          onPress={() => navigation.pop()}
        >
          <HeaderSideView>
            <Ionicons name="ios-close-circle" size={32} color="white" />
          </HeaderSideView>
        </TouchableHighlight>
      </HeaderView>

      <SectionList
        sections={actList.map(({ act, scenes }) => ({
          data: scenes,
          title: `ACT ${act}`
        }))}
        renderItem={({ item: { scene, act } }) => {
          const isCurrentScene = scene === currentScene && act === currentAct;
          return (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate({
                  routeName: "Play",
                  params: {
                    ...play,
                    currentAct: act,
                    currentScene: scene
                  },
                  key: "play-screen"
                })
              }
            >
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
        renderSectionHeader={({ section: { title } }) => (
          <ActHeaderView>
            <ActText>{title}</ActText>
          </ActHeaderView>
        )}
        keyExtractor={item => `${item.act}-${item.scene}`}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
};
