import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components";

import { Scene } from "../types/play-types";
import { titleFont } from "../styles/typography.js";
import { primaryColour } from "../styles/colours.js";

const PlaySceneHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 0;
  background-color: ${primaryColour};
`;

const SceneText = styled(Text)`
  ${titleFont}
  color: white;
`;

export default (props: Scene) => {
  const { act, scene } = props;

  return (
    <PlaySceneHeaderView>
      <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>
    </PlaySceneHeaderView>
  );
};
