import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import { LineRow } from "../../types/play-types";
import { italicFont, subFont, thinFont } from "../../styles/typography";

const LineRowView = styled.View`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
`;

const LineRowTextView = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 10px;
  width: 90%;
`;

const LineRowText = styled.Text`
  ${({ italic }: { italic: boolean }) => italic && italicFont}
  ${subFont}
  flex-wrap: wrap;
`;

const LineNumberView = styled.View`
  width: 10%;
`;

const LineRowNumberText = styled.Text`
  ${thinFont}
  text-align: center;
`;

type Props = LineRow & {
  italic: boolean;
};

export default ({ number, text, italic }: Props) => (
  <LineRowView>
    <LineRowTextView>
      <LineRowText italic={italic}>{text}</LineRowText>
    </LineRowTextView>

    <LineNumberView>
      {number % 5 === 0 && <LineRowNumberText>{number}</LineRowNumberText>}
    </LineNumberView>
  </LineRowView>
);
