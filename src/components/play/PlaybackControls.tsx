import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import Animated, { interpolate } from "react-native-reanimated";
import { useTiming } from "react-native-reanimation";
import RecordButton from "./RecordButton";

import AudioContext, {
  AudioContextValue,
  AudioState,
} from "../../contexts/Audio";
import Playback, { PlaybackMode } from "../../contexts/Playback";
import { lightGray, mediumGray, mediumLightGray } from "../../styles/colours";
import { subFont } from "../../styles/typography";
import PlayPosition from "../../contexts/PlayPosition";
import PlaySettings from "../../contexts/PlaySettings";
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
  const { mode: activeMode, setMode } = useContext(Playback);
  const audio: AudioContextValue = useContext(AudioContext);
  const { settings: { selectedPlayer}} = useContext(PlaySettings);
  const { activeLine } = useContext(PlayPosition);
  const isPlaying =
    audio.audioState === AudioState.Playing ||
    audio.audioState === AudioState.Speaking;
  const isRecording = audio.audioState === AudioState.Recording;

  const [expanded, setExpanded] = useState(true);
  const [position, , { toValue: positionTo }] = useTiming({
    position: -1,
    toValue: -1,
    duration: 150,
  });
  const [scale, , { toValue: scaleTo }] = useTiming({
    position: 1,
    toValue: 1,
    duration: 150,
  });

  const activateMode = (mode: PlaybackMode) => {
    if (mode === activeMode) {
      return;
    }

    audio.stop();
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
              <ModeBar
                style={{
                  transform: [
                    {
                      translateX: interpolate(position, {
                        inputRange: [-1, 1],
                        outputRange: [40, -40],
                      }),
                    },
                  ],
                  height: interpolate(scale, {
                    inputRange: [0, 1],
                    outputRange: [40, 80],
                  }),
                }}
              >
                <ModeView>
                  <TouchableWithoutFeedback
                    testID="play-bar-button"
                    onPress={() => activateMode(PlaybackMode.Play)}
                  >
                    <Animated.View
                      style={{
                        opacity: scale,
                        height: interpolate(scale, {
                          inputRange: [0, 1],
                          outputRange: [4, 34],
                        }),
                      }}
                    >
                      <ModeText>{PlaybackMode.Play}</ModeText>
                    </Animated.View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    testID="play-action"
                    disabled={PlaybackMode.Play !== activeMode}
                    onPress={async () => {
                      try {
                        if (isPlaying) {
                          await audio.pause();
                          return;
                        }

                        await audio.speak(activeLine);
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  >
                    <ButtonView
                      style={{
                        transform: [
                          {
                            scale: interpolate(scale, {
                              inputRange: [0, 1],
                              outputRange: [0.8, 1],
                            }),
                          },
                        ],
                        opacity: interpolate(position, {
                          inputRange: [-1, 1],
                          outputRange: [1, 0],
                        }),
                      }}
                    >
                      <Ionicons
                        name={isPlaying ? "ios-pause" : "ios-play"}
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
                    <Animated.View
                      style={{
                        opacity: scale,
                        height: interpolate(scale, {
                          inputRange: [0, 1],
                          outputRange: [4, 34],
                        }),
                      }}
                    >
                      <ModeText>{PlaybackMode.Record}</ModeText>
                    </Animated.View>
                  </TouchableWithoutFeedback>

                  <ButtonView
                    style={{
                      transform: [
                        {
                          scale: interpolate(scale, {
                            inputRange: [0, 1],
                            outputRange: [0.8, 1],
                          }),
                        },
                      ],
                      opacity: interpolate(position, {
                        inputRange: [-1, 1],
                        outputRange: [0, 1],
                      }),
                    }}
                  >
                    <RecordButton
                      audioState={audio.audioState}
                      disabled={PlaybackMode.Record !== activeMode}
                      onPress={async () => {
                        try {
                          if (isPlaying) {
                            await audio.pause();
                            return;
                          }

                          if (isRecording) {
                            await audio.stop();
                            return;
                          }

                          if (activeLine.player === selectedPlayer) {
                            await audio.record(activeLine);
                            return;
                          }

                          await audio.speak(activeLine);
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
