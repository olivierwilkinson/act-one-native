import React from "react";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

import { mediumSizeFont } from "../../../styles/typography";
import {
  mediumLightGray,
  mediumGray,
  lightGray
} from "../../../styles/colours";

const SceneHeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  background-color: ${lightGray};
  border-bottom-width: 1px;
  border-bottom-color: ${mediumLightGray};
`;

const IconView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

const arrowView = css`
  position: absolute;
  top: 5px;
  display: flex;
  align-items: center;
  width: 60px;
`;

const LeftArrowView = styled.View`
  ${arrowView}
  left: 15%;
`;

const RightArrowView = styled.View`
  ${arrowView}
  right: 15%;
`;

const SceneText = styled.Text`
  ${mediumSizeFont}
  color: rgb(120, 120, 120);
`;

const SceneSelectView = styled.View`
  position: absolute;
  right: 8px;
  top: 3px;
`;

export type Props = {
  act: number;
  scene: number;
  showNextSceneButton: boolean;
  showPreviousSceneButton: boolean;
  onNextScenePress: () => void;
  onPreviousScenePress: () => void;
  onSceneSelectPress: () => void;
};

export default ({
  act,
  scene,
  showPreviousSceneButton,
  showNextSceneButton,
  onPreviousScenePress,
  onNextScenePress,
  onSceneSelectPress
}: Props) => (
  <SceneHeaderView testID="play-scene-header">
    {showPreviousSceneButton && (
      <LeftArrowView>
        <TouchableHighlight
          testID="previous-scene-button"
          underlayColor={mediumLightGray}
          onPress={onPreviousScenePress}
        >
          <IconView>
            <Ionicons name="arrow-back" size={18} color={mediumGray} />
          </IconView>
        </TouchableHighlight>
      </LeftArrowView>
    )}

    <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>

    {showNextSceneButton && (
      <RightArrowView>
        <TouchableHighlight
          testID="next-scene-button"
          underlayColor={mediumLightGray}
          onPress={onNextScenePress}
        >
          <IconView>
            <Ionicons name="arrow-forward" size={18} color={mediumGray} />
          </IconView>
        </TouchableHighlight>
      </RightArrowView>
    )}

    <SceneSelectView>
      <TouchableHighlight
        testID="scene-select-button"
        underlayColor={mediumLightGray}
        onPress={onSceneSelectPress}
      >
        <IconView>
          <Ionicons name="list" size={32} color={mediumGray} />
        </IconView>
      </TouchableHighlight>
    </SceneSelectView>
  </SceneHeaderView>
);
