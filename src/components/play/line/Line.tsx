import React, { memo } from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import {
  lightPrimaryColour,
  playBackgroundColour,
} from "../../../styles/colours";
import LineRowContainer from "../lineRow/LineRowContainer";

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
  lineRowIds: number[];
  onPress: () => void;
};

const Line = ({ id, italic, highlighted, lineRowIds, onPress }: Props) => (
  <TouchableHighlight
    testID={`play-line-${id}`}
    onPress={onPress}
    underlayColor="transparent"
  >
    <LineView testID={`play-line-view-${id}`} highlighted={highlighted}>
      {lineRowIds.map((lineRowId) => (
        <LineRowContainer key={lineRowId} id={lineRowId} italic={italic} />
      ))}
    </LineView>
  </TouchableHighlight>
);

export default memo(Line);
