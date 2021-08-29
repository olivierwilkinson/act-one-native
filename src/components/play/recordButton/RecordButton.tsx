import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps
} from "react-native";
import Animated from "react-native-reanimated";
import { useTiming } from "react-native-reanimation";

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
  const [borderRadius, , { toValue: borderRadiusTo }] = useTiming({
    toValue: 20,
    position: 20,
    duration: 200
  });
  const [scale, , { toValue: scaleTo }] = useTiming({
    toValue: 0,
    duration: 200
  });

  useEffect(() => {
    switch (audioState) {
      case AudioState.Recording:
        borderRadiusTo.setValue(5);
        scaleTo.setValue(0.8);
        break;

      case AudioState.Playing:
      case AudioState.Speaking:
      case AudioState.Finished:
        borderRadiusTo.setValue(20);
        scaleTo.setValue(1);
        break;

      default:
        borderRadiusTo.setValue(20);
        scaleTo.setValue(0);
        break;
    }
  }, [audioState, borderRadiusTo, scaleTo]);

  return (
    <TouchableWithoutFeedback testID="record-button" {...touchableProps}>
      <RecordingIconBorder>
        <RecordingIcon
          // @ts-expect-error
          style={{
            borderRadius,
            transform: [{ scale }]
          }}
        />
      </RecordingIconBorder>
    </TouchableWithoutFeedback>
  );
};
