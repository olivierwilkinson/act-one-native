import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components";

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
  color: white;
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

  return (
    <PlayLineHeaderView>
      {!!player && (
        <PlayerBubbleView red={red} green={green} blue={blue}>
          <PlayerText>{player}</PlayerText>
        </PlayerBubbleView>
      )}
    </PlayLineHeaderView>
  );
};
