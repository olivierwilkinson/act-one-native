import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

import SceneList from "./SceneList";
import { Play, Scene } from "../../types/play-types";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";
import { PlaySettings } from '../../contexts/PlaySettings';

const TitleView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const TitleText = styled.Text`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

type Props = {
  play: Play;
  settings: PlaySettings;
  onScenePress: (scene: Scene) => void;
};

export default (props: Props) => {
  const { onScenePress, play, settings } = props;
  const { scenes } = play;
  const { act, scene } = settings;

  return (
    <SafeAreaView
      testID="scene-select"
      style={{ backgroundColor: lightPrimaryColour }}
    >
      <TitleView>
        <TitleText>Scene Select</TitleText>
      </TitleView>

      <SceneList
        currentAct={act}
        currentScene={scene}
        scenes={scenes}
        onScenePress={onScenePress}
      />
    </SafeAreaView>
  );
};
