import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import RecordButton from "../recordButton/RecordButton";

import { AudioState, useAudio } from "../../../contexts/Audio";
import { usePlayback, PlaybackMode } from "../../../contexts/Playback";
import {
  lightGray,
  mediumGray,
  mediumLightGray
} from "../../../styles/colours";
import { subFont } from "../../../styles/typography";

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

export default () => {
  const { mode: activeMode, setMode, start } = usePlayback();
  const audio = useAudio();
  const isPlaying = audio.audioState === AudioState.Playing;
  const isSpeaking = audio.audioState === AudioState.Speaking;
  const isPaused = audio.audioState === AudioState.Paused;
  const isStopped = audio.audioState === AudioState.Stopped;
  const isRecording = audio.audioState === AudioState.Recording;

  const [expanded, setExpanded] = useState(true);
  const position = useSharedValue(-1);
  const scale = useSharedValue(1);
  const timingConfig = { duration: 150 };

  const animatedModeBarStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(position.value, [-1, 1], [40, -40]) }
    ],
    height: interpolate(scale.value, [0, 1], [40, 80])
  }));

  const animatedPlayBarButtonStyle = useAnimatedStyle(() => ({
    opacity: scale.value,
    height: interpolate(scale.value, [0, 1], [4, 34])
  }));

  const animatedPlayButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 1], [0.8, 1]) }],
    opacity: interpolate(position.value, [-1, 1], [1, 0])
  }));

  const animiatedRecordBarButtonStyle = useAnimatedStyle(() => ({
    opacity: scale.value,
    height: interpolate(scale.value, [0, 1], [4, 34])
  }));

  const animatedRecordButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 1], [0.8, 1]) }],
    opacity: interpolate(position.value, [-1, 1], [0, 1])
  }));

  const activateMode = (mode: PlaybackMode) => {
    if (mode === activeMode) {
      return;
    }

    audio.stop();
    try {
      setMode(mode);
      position.value = withTiming(
        mode === PlaybackMode.Play ? -1 : 1,
        timingConfig
      );
    } catch (_) {}
  };

  const expandControls = (shouldExpand: boolean) => {
    if (expanded === shouldExpand) {
      return;
    }

    setExpanded(shouldExpand);
    scale.value = withTiming(shouldExpand ? 1 : 0, timingConfig);
  };

  return (
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
            <ControlsView testID="playback-controls">
              <ModeBar style={animatedModeBarStyle}>
                <ModeView>
                  <TouchableWithoutFeedback
                    testID="play-bar-button"
                    onPress={() => activateMode(PlaybackMode.Play)}
                  >
                    <Animated.View style={animatedPlayBarButtonStyle}>
                      <ModeText>{PlaybackMode.Play}</ModeText>
                    </Animated.View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    testID="play-button"
                    disabled={PlaybackMode.Play !== activeMode}
                    onPress={async () => {
                      try {
                        if (isPlaying || isSpeaking) {
                          await audio.pause();
                          return;
                        }

                        if (isPaused) {
                          await audio.resume();
                          return;
                        }

                        await start();
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  >
                    <ButtonView style={animatedPlayButtonStyle}>
                      <Ionicons
                        testID={
                          isStopped || isPaused ? "play-icon" : "pause-icon"
                        }
                        name={isStopped || isPaused ? "play" : "pause"}
                        size={40}
                        color="rgb(80, 80, 80)"
                      />
                    </ButtonView>
                  </TouchableWithoutFeedback>
                </ModeView>

                <ModeView>
                  <TouchableWithoutFeedback
                    testID="record-bar-button"
                    onPress={() => activateMode(PlaybackMode.Record)}
                  >
                    <Animated.View style={animiatedRecordBarButtonStyle}>
                      <ModeText>{PlaybackMode.Record}</ModeText>
                    </Animated.View>
                  </TouchableWithoutFeedback>

                  <ButtonView style={animatedRecordButtonStyle}>
                    <RecordButton
                      audioState={audio.audioState}
                      disabled={PlaybackMode.Record !== activeMode}
                      onPress={async () => {
                        try {
                          if (isPlaying || isSpeaking) {
                            await audio.pause();
                            return;
                          }

                          if (isPaused) {
                            await audio.resume();
                            return;
                          }

                          if (isRecording) {
                            await audio.finish();
                            return;
                          }

                          await start();
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    />
                  </ButtonView>
                </ModeView>
              </ModeBar>
            </ControlsView>
          </FlingGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
