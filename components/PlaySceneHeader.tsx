import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styled from "styled-components";

import { Scene } from "../types/play-types";
import { titleFont, mediumSizeFont } from "../styles/typography.js";
import { lightPrimaryColour } from "../styles/colours.js";

const PlaySceneHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 0;
  background-color: ${lightPrimaryColour};
`;

const SceneText = styled(Text)`
  ${titleFont}
  ${mediumSizeFont}
  color: white;
`;

export default (props: Scene) => {
  const { act, scene } = props;

  return (
    <TouchableHighlight onPress={() => console.log("hello")}>
      <PlaySceneHeaderView>
        <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>
      </PlaySceneHeaderView>
    </TouchableHighlight>
  );
};
