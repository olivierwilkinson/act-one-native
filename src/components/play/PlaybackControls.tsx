import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useTiming } from "react-native-reanimation";

import AudioContext, {
  AudioContextValue,
  PlaybackState
} from "../../contexts/Audio";
import PlaybackModeContext from "../../contexts/PlaybackMode";
import { PlaybackMode } from "../../types/playback-types";
import { lightGray, mediumGray, mediumLightGray } from "../../styles/colours";
import { subFont } from "../../styles/typography";

const modes = [PlaybackMode.Play, PlaybackMode.Record];

const ControlsView = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${lightGray};
  border-top-width: 1px;
  border-top-color: ${mediumLightGray};
`;

const ModeBar = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px 0;
  width: 200%;
`;

const ModeView = styled.View`
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModeText = styled.Text`
  ${subFont}
  padding: 6px 0;
  font-size: 13px;
  color: ${mediumGray};
`;

const ButtonView = styled(Animated.View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const ModeAction = ({
  mode,
  isPlaying
}: {
  mode: PlaybackMode;
  isPlaying: boolean;
}) => {
  switch (mode) {
    case PlaybackMode.Play:
      return (
        <Ionicons
          name={isPlaying ? "ios-pause" : "ios-play"}
          size={40}
          color="rgb(80, 80, 80)"
        />
      );

    case PlaybackMode.Record:
      return (
        <Ionicons
          name={isPlaying ? "ios-radio-button-on" : "ios-radio-button-off"}
          size={40}
          color="rgb(80, 80, 80)"
        />
      );
  }
};

export default () => {
  const audio: AudioContextValue = useContext(AudioContext);
  const { mode: activeMode, setMode } = useContext(PlaybackModeContext);
  const { playbackState, setPlaybackState } = audio;
  const isPlaying =
    playbackState === PlaybackState.Playing ||
    playbackState === PlaybackState.Recording;

  const [expanded, setExpanded] = useState(true);
  const [position, , { toValue: positionTo }] = useTiming({
    position: -1,
    toValue: -1,
    duration: 150
  });
  const [scale, , { toValue: scaleTo }] = useTiming({
    position: 1,
    toValue: 1,
    duration: 150
  });

  const activateMode = (mode: PlaybackMode) => {
    if (mode === activeMode) {
      return;
    }

    setPlaybackState(PlaybackState.Stopped);
    setMode(mode);
    positionTo.setValue(mode === PlaybackMode.Play ? -1 : 1);
  };

  const expandControls = (shouldExpand: boolean) => {
    if (expanded === shouldExpand) {
      return;
    }

    setExpanded(shouldExpand);
    scaleTo.setValue(shouldExpand ? 1 : 0);
  };

  return (
    <ControlsView testID="playback-controls">
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            const modeIndex = modes.indexOf(activeMode);
            if (modeIndex > 0) {
              activateMode(modes[modeIndex - 1]);
            }
          }
        }}
      >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              const modeIndex = modes.indexOf(activeMode);
              if (modeIndex < modes.length - 1) {
                activateMode(modes[modeIndex + 1]);
              }
            }
          }}
        >
          <FlingGestureHandler
            direction={Directions.UP}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                expandControls(true);
              }
            }}
          >
            <FlingGestureHandler
              direction={Directions.DOWN}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  expandControls(false);
                }
              }}
            >
              <ModeBar
                style={{
                  transform: [
                    {
                      translateX: Animated.interpolate(position, {
                        inputRange: [-1, 1],
                        outputRange: [40, -40]
                      })
                    }
                  ],
                  height: Animated.interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [40, 80]
                  })
                }}
              >
                {modes.map(mode => (
                  <ModeView key={mode}>
                    <TouchableWithoutFeedback
                      testID={`${mode.toLowerCase()}-bar-button`}
                      key={mode.toLowerCase()}
                      onPress={() => {
                        activateMode(mode);
                      }}
                    >
                      <Animated.View
                        style={{
                          opacity: scale,
                          height: Animated.interpolate(scale, {
                            inputRange: [0, 1],
                            outputRange: [4, 34]
                          })
                        }}
                      >
                        <ModeText>{mode}</ModeText>
                      </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      testID={`${mode.toLowerCase()}-action`}
                      disabled={mode !== activeMode}
                      onPress={() =>
                        setPlaybackState(
                          mode === PlaybackMode.Play
                            ? isPlaying
                              ? PlaybackState.Paused
                              : PlaybackState.Playing
                            : isPlaying
                            ? PlaybackState.Stopped
                            : PlaybackState.Recording
                        )
                      }
                    >
                      <ButtonView
                        style={{
                          transform: [
                            {
                              scale: Animated.interpolate(scale, {
                                inputRange: [0, 1],
                                outputRange: [0.8, 1]
                              })
                            }
                          ],
                          opacity: Animated.interpolate(position, {
                            inputRange: [-1, 1],
                            outputRange:
                              mode === PlaybackMode.Play ? [1, 0] : [0, 1]
                          })
                        }}
                      >
                        <ModeAction mode={mode} isPlaying={isPlaying} />
                      </ButtonView>
                    </TouchableWithoutFeedback>
                  </ModeView>
                ))}
              </ModeBar>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </ControlsView>
  );
};
