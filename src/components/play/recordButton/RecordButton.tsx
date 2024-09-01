import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import { AudioState } from "../../../contexts/Audio";

const RecordingIconBorder = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  border-width: 3px;
  border-color: rgb(80, 80, 80);
`;

const RecordingIcon = styled(Animated.View)`
  background: rgb(80,80,80)
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 11px;
`;

export type Props = TouchableWithoutFeedbackProps & {
  audioState: AudioState;
};

export default ({ audioState, ...touchableProps }: Props) => {
  const borderRadius = useSharedValue(20);
  const scale = useSharedValue(0);
  const timingConfig = {
    duration: 200
  };

  const animatedRecordingIconStyle = useAnimatedStyle(() => ({
    borderRadius: borderRadius.value,
    transform: [{ scale: scale.value }]
  }));

  useEffect(() => {
    switch (audioState) {
      case AudioState.Recording:
        borderRadius.value = withTiming(5, timingConfig);
        scale.value = withTiming(0.8, timingConfig);
        break;

      case AudioState.Playing:
      case AudioState.Speaking:
      case AudioState.Finished:
        borderRadius.value = withTiming(20, timingConfig);
        scale.value = withTiming(1, timingConfig);
        break;

      default:
        borderRadius.value = withTiming(20, timingConfig);
        scale.value = withTiming(0, timingConfig);
        break;
    }
  }, [audioState, borderRadius, scale]);

  return (
    <TouchableWithoutFeedback testID="record-button" {...touchableProps}>
      <RecordingIconBorder>
        <RecordingIcon style={animatedRecordingIconStyle} />
      </RecordingIconBorder>
    </TouchableWithoutFeedback>
  );
};
