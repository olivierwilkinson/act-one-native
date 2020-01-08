import React, { useContext } from "react";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

import PlayNavigationContext, {
  PlayNavigation
} from "../../contexts/PlayNavigation";
import { Scene } from "../../types/play-types";
import { titleFont, mediumSizeFont } from "../../styles/typography";
import { lightPrimaryColour, primaryColour } from "../../styles/colours";

const PlaySceneHeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  background-color: ${lightPrimaryColour};
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
  ${titleFont}
  ${mediumSizeFont}
  color: white;
`;

const SceneSelectView = styled.View`
  position: absolute;
  right: 8px;
  top: 3px;
`;

export default ({ act, scene }: Scene) => {
  const {
    goToNextScene,
    goToPreviousScene,
    openSceneSelect
  }: PlayNavigation = useContext(PlayNavigationContext);

  return (
    <PlaySceneHeaderView testID="play-scene-header">
      {goToPreviousScene && (
        <LeftArrowView>
          <TouchableHighlight
            testID="previous-scene-button"
            underlayColor={primaryColour}
            onPress={goToPreviousScene}
          >
            <IconView>
              <Ionicons name="ios-arrow-back" size={18} color="white" />
            </IconView>
          </TouchableHighlight>
        </LeftArrowView>
      )}

      <SceneText>{`ACT ${act} - SCENE ${scene}`}</SceneText>

      {goToNextScene && (
        <RightArrowView>
          <TouchableHighlight
            testID="next-scene-button"
            underlayColor={primaryColour}
            onPress={goToNextScene}
          >
            <IconView>
              <Ionicons name="ios-arrow-forward" size={18} color="white" />
            </IconView>
          </TouchableHighlight>
        </RightArrowView>
      )}

      <SceneSelectView>
        <TouchableHighlight
          testID="scene-select-button"
          underlayColor={lightPrimaryColour}
          onPress={openSceneSelect}
        >
          <IconView>
            <Ionicons name="ios-list" size={32} color="white" />
          </IconView>
        </TouchableHighlight>
      </SceneSelectView>
    </PlaySceneHeaderView>
  );
};
