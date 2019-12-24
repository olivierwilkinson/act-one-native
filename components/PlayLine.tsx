import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import { Line } from "../plays/play";
import { titleFont, subFont } from "../styles/typography.js";

const PlayerText = styled(Text)`
  ${titleFont}
`;
const LineText = styled(Text)`
  ${subFont}
`;

export default (props: Line) => (
  <View>
    <PlayerText>{props.player}</PlayerText>
    <LineText>{props.line}</LineText>
  </View>
);
