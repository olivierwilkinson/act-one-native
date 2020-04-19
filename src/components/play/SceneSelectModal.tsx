import React, { useContext } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";

import SceneList from "./SceneList";
import { Play } from "../../types/play-types";
import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour, primaryColour } from "../../styles/colours";
import PlaySettingsContext from "../../contexts/PlaySettings";
import PlayPositionContext from "../../contexts/PlayPosition";

const ContentView = styled.View`
  height: 100%;
  width: 100%;
  background: white;
  border-radius: 40px;
  background: white;
  margin-top: 100px;
`;

const TitleView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  height: 55px;
  background: ${lightPrimaryColour};
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

const CloseTouchableHighlight = styled.TouchableHighlight`
  position: absolute;
  right: 14px;
`;

export type Props = {
  play: Play;
  visible: boolean;
  onClose: () => void;
};

export default ({ play, visible, onClose }: Props) => {
  const { setSettings } = useContext(PlaySettingsContext);
  const { activeScene } = useContext(PlayPositionContext);

  return (
    <Modal
      isVisible={visible}
      presentationStyle="overFullScreen"
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={{ margin: 0 }}
    >
      <ContentView testID="scene-select">
        <TitleView>
          <TitleText>Scene Select</TitleText>

          <CloseTouchableHighlight
            testID="settings-close-button"
            onPress={onClose}
            underlayColor={primaryColour}
          >
            <HeaderText>Close</HeaderText>
          </CloseTouchableHighlight>
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
      </ContentView>
    </Modal>
  );
};
