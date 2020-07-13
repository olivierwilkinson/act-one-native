import React from "react";
import styled from "styled-components/native";

import { LineRow } from "../../../types/play-types";
import { italicFont, subFont, thinFont } from "../../../styles/typography";
import { mediumDarkGray } from "../../../styles/colours";

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
  color: ${mediumDarkGray}
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

export default ({ number, text, italic }: Props) => {
  const displayNumber = !!number && number % 5 === 0;

  return (
    <LineRowView>
      <LineRowTextView>
        <LineRowText italic={italic}>{text}</LineRowText>
      </LineRowTextView>

      <LineNumberView>
        {displayNumber && <LineRowNumberText>{number}</LineRowNumberText>}
      </LineNumberView>
    </LineRowView>
  );
};
