import React, { useContext } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { withNavigation } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

import PlayContext from "../contexts/Play";
import { Play, Scene } from "../types/play-types";
import { titleFont, mediumSizeFont } from "../styles/typography.js";
import { lightPrimaryColour } from "../styles/colours.js";

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
  navigation: NavigationStackProp;
};

export default withNavigation((props: Props) => {
  const play: Play = useContext(PlayContext);
  const { act, scene, navigation } = props;

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("PlaySceneSelectModal", { ...play, act, scene })
      }
    >
      <PlaySceneHeaderView>
        <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>

        <SceneSelectIcon name="ios-list" size={32} color="white" />
      </PlaySceneHeaderView>
    </TouchableHighlight>
  );
});
