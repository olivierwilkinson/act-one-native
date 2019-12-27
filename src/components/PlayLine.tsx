import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import { Line } from "../types/play-types";
import { italicFont, subFont, thinFont } from "../styles/typography.js";

const PlayLineView = styled(View)`
  margin: 10px 0;
`;

const LineRowView = styled(View)`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
`;

const LineRowTextView = styled(View)`
  display: flex;
  flex-direction: row;
  padding-left: 5%;
  padding-right: 10px;
  width: 90%;
`;

const LineRowText = styled(Text)`
  ${props => props.direction && italicFont}
  ${subFont}
  flex-wrap: wrap;
`;

const LineNumberView = styled(View)`
  width: 10%;
`;

const LineRowNumberText = styled(Text)`
  ${thinFont}
  text-align: center;
`;

export default ({ id, lineRows, player }: Line) => (
  <PlayLineView>
    {lineRows.map((lineRow, i) => (
      <LineRowView key={`${id}-${i}`}>
        <LineRowTextView>
          <LineRowText direction={!player}>{lineRow.text}</LineRowText>
        </LineRowTextView>

        <LineNumberView>
          {lineRow.number % 5 === 0 && (
            <LineRowNumberText>{lineRow.number}</LineRowNumberText>
          )}
        </LineNumberView>
      </LineRowView>
    ))}
  </PlayLineView>
);
