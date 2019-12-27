import React, { RefAttributes } from "react";
import { View, ViewProps, Text } from "react-native";
import styled, { ThemeProps } from "styled-components";

import { titleFont } from "../styles/typography";
import { RGBColour } from "../types/colour-types";
import { playBackgroundColour } from "../styles/colours";

const PlayLineHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;

const PlayerBubbleView = styled(View)`
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 1px;
  border-color: rgb(
    ${({ red }: RGBColour) => red},
    ${({ green }: RGBColour) => green},
    ${({ blue }: RGBColour) => blue}
  );
  background-color: ${playBackgroundColour};
`;

const PlayerText = styled(Text)`
  color: rgb(
    ${({ red }: RGBColour) => red},
    ${({ green }: RGBColour) => green},
    ${({ blue }: RGBColour) => blue}
  );
  ${titleFont}
`;

type Props = {
  player: string;
  colour: RGBColour;
};

export default (props: Props) => {
  const { player, colour } = props;

  return (
    <PlayLineHeaderView>
      {!!player && (
        <PlayerBubbleView {...colour}>
          <PlayerText {...colour}>{player}</PlayerText>
        </PlayerBubbleView>
      )}
    </PlayLineHeaderView>
  );
};
