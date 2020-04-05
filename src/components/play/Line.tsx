import React, { useContext, memo } from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import { Line as LineType } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import AudioContext, { PlaybackState } from "../../contexts/Audio";
import { lightPrimaryColour, playBackgroundColour } from "../../styles/colours";

import LineRow from "./LineRow";

const LineView = styled.View`
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-top-width: 0px;
  padding: 10px 0;
`;

const Line = (line: LineType) => {
  const { id, lineRows, player } = line;
  const { activeLine, setActiveLine } = useContext(PlayPositionContext);
  const { setPlaybackState } = useContext(AudioContext);

  return (
    <TouchableHighlight
      testID={`play-line-${id}`}
      onPress={() => {
        setActiveLine(line);
        setPlaybackState(PlaybackState.Stopped);
      }}
      underlayColor="transparent"
    >
      <LineView
        testID={`play-line-view-${id}`}
        highlighted={activeLine.id === id}
      >
        {lineRows.map(lineRow => (
          <LineRow
            key={`${id}-${lineRow.text}`}
            italic={!player}
            {...lineRow}
          />
        ))}
      </LineView>
    </TouchableHighlight>
  );
};

// don't rerender on prop changes to optimise lists
export default memo(Line);
