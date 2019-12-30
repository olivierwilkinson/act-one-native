import React, { useContext, RefAttributes } from "react";
import { View, ViewProps, Text } from "react-native";
import styled, { ThemeProps } from "styled-components";

import { titleFont } from "../styles/typography";
import { RGBColour } from "../types/colour-types";
import { playBackgroundColour, lightPrimaryColour } from "../styles/colours";
import PlayContext from "../contexts/Play";

type ColourProps = RGBColour & {
  highlighted: boolean;
};

const PlayLineHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-color: ${lightPrimaryColour};
  border-width: ${({ highlighted }: ColourProps) =>
    highlighted ? "2px" : "0"};
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

type Props = {
  player: string;
  lineId: number;
  colour: RGBColour;
};

export default (props: Props) => {
  const { currentLineId } = useContext(PlayContext);
  const { player, lineId, colour } = props;
  const isCurrentLine = currentLineId === lineId;
  const colourProps = {
    ...colour,
    highlighted: isCurrentLine
  };

  return (
    <PlayLineHeaderView {...colourProps}>
      {!!player && (
        <PlayerBubbleView {...colourProps}>
          <PlayerText {...colourProps}>{player}</PlayerText>
        </PlayerBubbleView>
      )}
    </PlayLineHeaderView>
  );
};
