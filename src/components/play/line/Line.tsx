import React, { memo } from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import { LineRow as LineRowType } from "../../../types/play-types";
import {
  lightPrimaryColour,
  playBackgroundColour
} from "../../../styles/colours";

import LineRow from "../lineRow/LineRow";

const LineView = styled.View`
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : playBackgroundColour};
  border-width: 2px;
  border-top-width: 0px;
  padding: 10px 0;
`;

export type Props = {
  id: number;
  italic: boolean;
  highlighted: boolean;
  lineRows: LineRowType[];
  onPress: () => void;
};

const Line = ({ id, italic, highlighted, lineRows, onPress }: Props) => (
  <TouchableHighlight
    testID={`play-line-${id}`}
    onPress={onPress}
    underlayColor="transparent"
  >
    <LineView testID={`play-line-view-${id}`} highlighted={highlighted}>
      {lineRows.map(lineRow => (
        <LineRow key={`${id}-${lineRow.text}`} italic={italic} {...lineRow} />
      ))}
    </LineView>
  </TouchableHighlight>
);

export default memo(Line);
