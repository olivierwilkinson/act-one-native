import React from "react";
import styled from "styled-components/native";

import { titleFont } from "../../styles/typography";
import { playBackgroundColour } from "../../styles/colours";
import { RGBColour } from "../../types/colour-types";

type ColourProps = RGBColour & {
  highlighted: boolean;
};

const PlayerBubbleView = styled.View`
  margin: 5px 0px 5px 10px;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${({ red, green, blue }: ColourProps) =>
    `rgb(${red},${green},${blue})`}
  background-color: ${({ red, green, blue, highlighted }: ColourProps) =>
    highlighted ? `rgb(${red},${green},${blue})` : playBackgroundColour};
`;

const PlayerText = styled.Text`
  color: ${({ red, green, blue, highlighted }: ColourProps) =>
      highlighted ? "white" : `rgb(${red},${green},${blue})`}
    ${titleFont};
`;

type Props = {
  player: string;
  colour: RGBColour;
  highlighted: boolean;
};

export default ({ player, colour, highlighted }: Props) => (
  <PlayerBubbleView
    testID="player-bubble"
    highlighted={highlighted}
    {...colour}
  >
    <PlayerText highlighted={highlighted} {...colour}>
      {player}
    </PlayerText>
  </PlayerBubbleView>
);
