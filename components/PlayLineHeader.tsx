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
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  border-width: 1px;
  border-color: rgb(
    ${({ red }) => red},
    ${({ green }) => green},
    ${({ blue }) => blue}
  );
`;

const PlayerText = styled(Text)`
  color: rgb(
    ${({ red }) => red},
    ${({ green }) => green},
    ${({ blue }) => blue}
  );
  ${titleFont}
`;

type Props = {
  player: string;
  colour: number[];
};

export default (props: Props) => {
  const {
    player,
    colour: [red, green, blue]
  } = props;
  const colour = { red, green, blue };

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
