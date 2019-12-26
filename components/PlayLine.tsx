import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components";

import { Line } from "../types/play-types";
import { titleFont, subFont, thinFont } from "../styles/typography.js";

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
  ${props => props.bold ? titleFont : subFont}
  flex-wrap: wrap;
`;

const LineNumberView = styled(View)`
  width: 10%;
`;

const LineRowNumberText = styled(Text)`
  ${thinFont}
  text-align: center;
`;

export default (props: Line) => (
  <PlayLineView>
    {props.lines.map((line, i) => (
      <LineRowView key={`${props.id}-${i}`}>
        <LineRowTextView>
          <LineRowText bold={!props.player}>{line.text}</LineRowText>
        </LineRowTextView>

        <LineNumberView>
          {line.number % 5 === 0 && (
            <LineRowNumberText>{line.number}</LineRowNumberText>
          )}
        </LineNumberView>
      </LineRowView>
    ))}
  </PlayLineView>
);
