import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

import { Scene } from "../types/play-types";
import { titleFont, mediumSizeFont } from "../styles/typography";
import { lightPrimaryColour } from "../styles/colours";

const PlaySceneHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  background-color: ${lightPrimaryColour};
`;

const SceneText = styled(Text)`
  ${titleFont}
  ${mediumSizeFont}
  color: white;
`;

const SceneSelectIcon = styled(Ionicons)`
  position: absolute;
  right: 8px;
  top: 3px;
`;

type Props = Scene & {
  onSceneSelectPress: () => void;
};

export default ({ onSceneSelectPress, act, scene }: Props) => (
  <TouchableHighlight onPress={onSceneSelectPress}>
    <PlaySceneHeaderView>
      <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>

      <SceneSelectIcon name="ios-list" size={32} color="white" />
    </PlaySceneHeaderView>
  </TouchableHighlight>
);
