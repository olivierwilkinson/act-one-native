import React, { memo } from "react";
import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

import {
  playBackgroundColour,
  lightPrimaryColour
} from "../../../styles/colours";
import { RGBColour } from "../../../types/colour-types";
import PlayerBubble from "../playerBubble/PlayerBubble";

const LineHeaderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-bottom-width: 0;
`;

type Props = {
  onPress: () => void;
  highlighted: boolean;
  player: string;
  colour?: RGBColour;
  isSelected: boolean;
};

const LineHeader = ({
  onPress,
  highlighted,
  player,
  colour = { red: 0, green: 0, blue: 0 },
  isSelected
}: Props) => (
  <TouchableHighlight onPress={onPress} underlayColor="transparent">
    <LineHeaderView testID="play-line-header" highlighted={highlighted}>
      {!!player && (
        <PlayerBubble
          colour={colour}
          highlighted={highlighted}
          player={player}
          isSelected={isSelected}
        />
      )}
    </LineHeaderView>
  </TouchableHighlight>
);

// don't rerender on prop changes to optimise lists
export default memo(LineHeader);
