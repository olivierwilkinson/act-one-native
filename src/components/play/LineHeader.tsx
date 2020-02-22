import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

import { playBackgroundColour, lightPrimaryColour } from "../../styles/colours";
import { RGBColour } from "../../types/colour-types";
import { Line } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import PlayerBubble from "./PlayerBubble";

const LineHeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-bottom-width: 0;
`;

type Props = Line & {
  colour: RGBColour;
};

export default (props: Props) => {
  const { activeLine, setActiveLineById } = useContext(PlayPositionContext);
  const { player, id, colour } = props;
  const isCurrentLine = activeLine.id === id;

  return (
    <TouchableHighlight
      testID="play-line-header"
      onPress={() => setActiveLineById(id)}
      underlayColor={playBackgroundColour}
    >
      <LineHeaderView highlighted={isCurrentLine}>
        {!!player && (
          <PlayerBubble
            colour={colour}
            highlighted={isCurrentLine}
            player={player}
          />
        )}
      </LineHeaderView>
    </TouchableHighlight>
  );
};
