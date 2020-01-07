import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AudioContext, {
  AudioContextValue,
  PlaybackState
} from "../../contexts/Audio";
import { lightGray } from "../../styles/colours";

const ControlsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  height: 80px;
  background-color: ${lightGray};
`;

const PlayView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-top: 10px;
`;

export default () => {
  const audio: AudioContextValue = useContext(AudioContext);
  const { playbackState, setPlaybackState } = audio;
  const isPlaying = playbackState === PlaybackState.Playing;

  const handlePlayButtonPress = () => {
    if (isPlaying) {
      return setPlaybackState(PlaybackState.Paused);
    }

    setPlaybackState(PlaybackState.Playing);
  };

  return (
    <ControlsView testID="playback-controls">
      <TouchableHighlight
        testID="play-pause-button"
        underlayColor={lightGray}
        onPress={handlePlayButtonPress}
      >
        <PlayView>
          <Ionicons
            name={isPlaying ? "ios-pause" : "ios-play"}
            size={32}
            color="black"
          />
        </PlayView>
      </TouchableHighlight>
    </ControlsView>
  );
};
