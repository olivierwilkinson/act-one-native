import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import { Line } from "../types/play-types";
import { italicFont, subFont, thinFont } from "../styles/typography";
import PlayContext from "../contexts/Play";
import { lightPrimaryColour } from "../styles/colours";

const PlayLineView = styled(View)`
  border-color: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? lightPrimaryColour : "transparent"};
  border-width: ${({ highlighted }: { highlighted: boolean }) =>
    highlighted ? "2px" : "0px"};
  border-top-width: 0px;
  padding: 10px 0;
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
  ${({ direction }: { direction: boolean }) => direction && italicFont}
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

export default ({ id, lineRows, player }: Line) => {
  const { currentLineId } = useContext(PlayContext);
  return (
    <PlayLineView highlighted={currentLineId === id}>
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
};
