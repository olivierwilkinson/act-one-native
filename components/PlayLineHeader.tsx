import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components";

import { titleFont } from "../styles/typography.js";

const PlayLineHeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`;

const PlayerBubbleView = styled(View)`
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: rgb(
    ${({ red }) => red},
    ${({ green }) => green},
    ${({ blue }) => blue}
  );
`;

const PlayerText = styled(Text)`
  ${titleFont}
  color: white;
`;

type Props = {
  player: string;
  colour: number[];
};

export default (props: Props) => {
  const [red, green, blue] = props.colour;

  return (
    <PlayLineHeaderView>
      <PlayerBubbleView red={red} green={green} blue={blue}>
        <PlayerText>{props.player}</PlayerText>
      </PlayerBubbleView>
    </PlayLineHeaderView>
  );
};
