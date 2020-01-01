import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { TouchableHighlight } from "react-native-gesture-handler";

import { titleFont } from "../styles/typography";
import { playBackgroundColour, lightPrimaryColour } from "../styles/colours";
import { RGBColour } from "../types/colour-types";
import { Line } from "../types/play-types";
import PlayPositionContext from "../contexts/PlayPosition";

type ColourProps = RGBColour & {
  highlighted: boolean;
};

const PlayLineHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-color: ${({ highlighted }: ColourProps) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-bottom-width: 0;
`;

const PlayerBubbleView = styled(View)`
  margin: 5px 0px 5px 10px;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({ red, green, blue }: ColourProps) =>
    `rgb(${red},${green},${blue})`}
  background-color: ${({ red, green, blue, highlighted }: ColourProps) =>
    highlighted ? `rgb(${red},${green},${blue})` : playBackgroundColour};
`;

const PlayerText = styled(Text)`
  color: ${({ red, green, blue, highlighted }: ColourProps) =>
      highlighted ? "white" : `rgb(${red},${green},${blue})`}
    ${titleFont};
`;

type Props = Line & {
  colour: RGBColour;
};

export default (props: Props) => {
  const { activeLine, setActiveLineById } = useContext(PlayPositionContext);
  const { player, id, colour } = props;
  const isCurrentLine = activeLine.id === id;
  const colourProps = {
    ...colour,
    highlighted: isCurrentLine
  };

  return (
    <TouchableHighlight
      testID="play-line-header"
      onPress={() => setActiveLineById(id)}
      underlayColor={playBackgroundColour}
    >
      <PlayLineHeaderView {...colourProps}>
        {!!player && (
          <PlayerBubbleView testID="player-bubble" {...colourProps}>
            <PlayerText {...colourProps}>{player}</PlayerText>
          </PlayerBubbleView>
        )}
      </PlayLineHeaderView>
    </TouchableHighlight>
  );
};
