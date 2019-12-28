import React, { useContext } from "react";
import styled from "styled-components";
import { TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AudioContext, { AudioContextValue } from "../contexts/Audio";
import { PlaybackState } from "../controllers/PlayAudioController";
import { lightGray } from "../styles/colours";

const ControlsView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  height: 80px;
  background-color: ${lightGray};
`;

const PlayView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-top: 10px;
`;

export default () => {
  const audio: AudioContextValue = useContext(AudioContext);
  const { playbackState, play, resume, pause } = audio;
  const isPlaying = playbackState === PlaybackState.Playing;

  const handlePlayButtonPress = () => {
    switch (playbackState) {
      case PlaybackState.Stopped:
        return play();

      case PlaybackState.Paused:
        return resume();

      case PlaybackState.Playing:
        return pause();

      default:
        return;
    }
  };

  return (
    <ControlsView>
      <TouchableHighlight
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
