import React from "react";
import styled from "styled-components";
import { TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

type Props = {
  isPlaying: boolean;
  togglePlayback: () => void;
};

export default ({ isPlaying, togglePlayback }: Props) => (
  <ControlsView>
    <TouchableHighlight underlayColor={lightGray} onPress={togglePlayback}>
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
