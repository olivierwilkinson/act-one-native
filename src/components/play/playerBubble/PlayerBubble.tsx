import React from "react";
import styled from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { titleFont, normalFont } from "../../../styles/typography";
import { playBackgroundColour } from "../../../styles/colours";
import { RGBColour } from "../../../types/colour-types";

const PlayerBubbleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px 0px 5px 10px;
  border-radius: 18px;
  border-width: 1px;
  border-color: ${({ red, green, blue }: RGBColour) =>
    `rgb(${red},${green},${blue})`}
  background-color: ${({
    red,
    green,
    blue,
    highlighted
  }: RGBColour & { highlighted: boolean }) =>
    highlighted ? `rgb(${red},${green},${blue})` : playBackgroundColour};
`;

const UserView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  padding: 5px 0px;
  width: 36px;
  border-width: 1px;
  border-color: ${({ red, green, blue }: RGBColour) =>
    `rgb(${red},${green},${blue})`}
  margin: -1px;
`;

const PlayerText = styled.Text`
  color: ${({
      red,
      green,
      blue,
      highlighted
    }: RGBColour & { highlighted: boolean }) =>
      highlighted ? "white" : `rgb(${red},${green},${blue})`}
    ${titleFont};
  overflow: hidden;
  padding: 5px 10px;
  ${normalFont}
`;

export type Props = {
  player: string;
  colour: RGBColour;
  highlighted: boolean;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
};

export default ({
  player,
  colour,
  highlighted,
  style,
  isSelected = false
}: Props) => (
  <PlayerBubbleView
    testID="player-bubble"
    highlighted={highlighted}
    style={style}
    {...colour}
  >
    {isSelected && (
      <UserView testID="player-user-icon" {...colour}>
        <Ionicons
          name="person"
          size={20}
          color={
            highlighted
              ? "white"
              : `rgb(${colour.red},${colour.green},${colour.blue})`
          }
        />
      </UserView>
    )}

    <PlayerText numberOfLines={1} highlighted={highlighted} {...colour}>
      {player}
    </PlayerText>
  </PlayerBubbleView>
);
