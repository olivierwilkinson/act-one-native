import React, { useContext } from "react";
import { View, Modal } from "react-native";
import styled from "styled-components/native";

import SceneList from "./SceneList";
import Header from "../common/Header";
import { Play } from "../../types/play-types";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour } from "../../styles/colours";
import PlaySettingsContext from "../../contexts/PlaySettings";
import PlayPositionContext from "../../contexts/PlayPosition";

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

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

type Props = {
  play: Play;
  visible: boolean;
  onClose: () => void;
};

export default ({ play, visible, onClose }: Props) => {
  const { setSettings } = useContext(PlaySettingsContext);
  const { activeScene } = useContext(PlayPositionContext);

  return (
    <Modal visible={visible} animationType="slide">
      <View
        testID="scene-select"
        style={{ backgroundColor: lightPrimaryColour }}
      >
        <Header
          title={play.play}
          right={{
            onPress: onClose,
            view: <HeaderText>Close</HeaderText>
          }}
        />

        <TitleView>
          <TitleText>Scene Select</TitleText>
        </TitleView>

        <SceneList
          activeScene={activeScene}
          scenes={play.scenes}
          onScenePress={scene =>
            setSettings({
              act: scene.act,
              scene: scene.scene
            })
          }
        />
      </View>
    </Modal>
  );
};
