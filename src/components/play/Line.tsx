import React, { useContext } from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import { Line } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import { lightPrimaryColour, playBackgroundColour } from "../../styles/colours";

import LineRow from "./LineRow";

const LineView = styled.View`
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-top-width: 0px;
  padding: 10px 0;
`;

export default (line: Line) => {
  const { id, lineRows, player } = line;
  const { activeLine, setActiveLine } = useContext(PlayPositionContext);

  return (
    <TouchableHighlight
      testID={`play-line-${id}`}
      onPress={() => setActiveLine(line)}
      underlayColor={playBackgroundColour}
    >
      <LineView
        testID={`play-line-view-${id}`}
        highlighted={activeLine.id === id}
      >
        {lineRows.map((lineRow, i) => (
          <LineRow key={`${id}-${i}`} italic={!player} {...lineRow} />
        ))}
      </LineView>
    </TouchableHighlight>
  );
};
