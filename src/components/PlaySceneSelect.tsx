import React from "react";
import { View, Text, SafeAreaView, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

import PlaySceneList from "./PlaySceneList";
import { Play, Scene } from "../types/play-types";
import { titleFont, bigSizeFont } from "../styles/typography";
import { primaryColour } from "../styles/colours";

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

type Props = Play & {
  onClosePress: () => void;
  onScenePress: (scene: Scene) => void;
};

export default (props: Props) => {
  const { onScenePress, onClosePress, ...play } = props;
  const { currentAct, currentScene, scenes } = play;

  return (
    <SafeAreaView style={{ backgroundColor: primaryColour }}>
      <HeaderView>
        <HeaderSideView />

        <TitleView>
          <TitleText>Select Scene</TitleText>
        </TitleView>

        <TouchableHighlight
          underlayColor={primaryColour}
          onPress={onClosePress}
        >
          <HeaderSideView>
            <Ionicons name="ios-close-circle" size={32} color="white" />
          </HeaderSideView>
        </TouchableHighlight>
      </HeaderView>

      <PlaySceneList
        currentAct={currentAct}
        currentScene={currentScene}
        scenes={scenes}
        onScenePress={onScenePress}
      />
    </SafeAreaView>
  );
};
