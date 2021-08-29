import React from "react";
import styled from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";

import SceneContainer from "./scene/SceneContainer";
import SceneHeaderContainer from "./sceneHeader/SceneHeaderContainer";
import PlaybackControls from "./playbackControls/PlaybackControls";

const PlayView = styled.View`
  display: flex;
  justify-content: space-between;
`;

export type Props = {
  style?: StyleProp<ViewStyle>;
};

export default ({ style }: Props) => (
  <PlayView style={style}>
    <SceneHeaderContainer />
    <SceneContainer />
    <PlaybackControls />
  </PlayView>
);
