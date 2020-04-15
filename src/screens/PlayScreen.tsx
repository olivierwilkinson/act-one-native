import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import PlaySettingsProvider from "../components/play/PlaySettingsProvider";
import PlayPositionProvider from "../components/play/PlayPositionProvider";
import PlayNavigationProvider from "../components/play/PlayNavigationProvider";
import AudioProvider from "../components/play/AudioProvider";
import Play from "../components/play/Play";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import PlaySettingsModal from "../components/play/PlaySettingsModal";
import SceneSelectModal from "../components/play/SceneSelectModal";
import { bigSizeFont } from "../styles/typography";
import { PlayNavigationProp, PlayRouteProp } from "../types/navigation-types";

export type Props = {
  navigation: PlayNavigationProp;
  route: PlayRouteProp;
};

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export default ({ navigation, route }: Props) => {
  const [settingsActive, setSettingsActive] = useState(false);
  const [sceneSelectActive, setSceneSelectActive] = useState(false);
  const play = route.params?.play;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={play?.play}
          left={{
            view: <HeaderText>Back</HeaderText>,
            onPress: () => navigation.pop()
          }}
          right={{
            onPress: () => setSettingsActive(true),
            view: <Ionicons name="ios-settings" color="white" size={28} />
          }}
        />
      )
    });
  }, [navigation, setSettingsActive]);

  if (!play) {
    return <Error message="Play could not be loaded" />;
  }

  return (
    <PlaySettingsProvider
      play={play}
      onSettingsChange={() => {
        setSceneSelectActive(false);
      }}
    >
      <PlayPositionProvider play={play}>
        <PlayNavigationProvider play={play}>
          <AudioProvider>
            <Play
              play={play}
              openSceneSelect={() => setSceneSelectActive(true)}
            />

            <PlaySettingsModal
              play={play}
              visible={settingsActive}
              onClose={() => setSettingsActive(false)}
            />
            <SceneSelectModal
              play={play}
              visible={sceneSelectActive}
              onClose={() => setSceneSelectActive(false)}
            />
          </AudioProvider>
        </PlayNavigationProvider>
      </PlayPositionProvider>
    </PlaySettingsProvider>
  );
};
