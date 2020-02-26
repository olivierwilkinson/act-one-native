import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

import { playBackgroundColour, lightPrimaryColour } from "../../styles/colours";
import { RGBColour } from "../../types/colour-types";
import { Line } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import PlayerBubble from "./PlayerBubble";
import PlaySettingsContext from "../../contexts/PlaySettings";

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

export default ({ colour, ...line }: Props) => {
  const { activeLine, setActiveLine } = useContext(PlayPositionContext);
  const { selectedPlayer } = useContext(PlaySettingsContext);
  const { player, id } = line;
  const isCurrentLine = activeLine.id === id;

  return (
    <TouchableHighlight
      testID="play-line-header"
      onPress={() => setActiveLine(line)}
      underlayColor={playBackgroundColour}
    >
      <LineHeaderView highlighted={isCurrentLine}>
        {!!player && (
          <PlayerBubble
            colour={colour}
            highlighted={isCurrentLine}
            player={player}
            isSelected={selectedPlayer === player}
          />
        )}
      </LineHeaderView>
    </TouchableHighlight>
  );
};
