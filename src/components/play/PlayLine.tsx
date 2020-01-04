import React, { useContext } from "react";
import { View, TouchableHighlight } from "react-native";
import styled from "styled-components";

import { Line } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import { lightPrimaryColour, playBackgroundColour } from "../../styles/colours";

import PlayLineRow from "./PlayLineRow";

const PlayLineView = styled(View)`
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-top-width: 0px;
  padding: 10px 0;
`;

export default ({ id, lineRows, player }: Line) => {
  const { activeLine, setActiveLineById } = useContext(PlayPositionContext);

  return (
    <TouchableHighlight
      testID={`play-line-${id}`}
      onPress={() => setActiveLineById(id)}
      underlayColor={playBackgroundColour}
    >
      <PlayLineView
        testID={`play-line-view-${id}`}
        highlighted={activeLine.id === id}
      >
        {lineRows.map((lineRow, i) => (
          <PlayLineRow key={`${id}-${i}`} italic={!player} {...lineRow} />
        ))}
      </PlayLineView>
    </TouchableHighlight>
  );
};
