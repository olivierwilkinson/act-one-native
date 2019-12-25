import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import styled from "styled-components";

import { Line } from "../types/play-types";

const PlayLineView = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const TextView = styled(View)`
  margin-left: 15px;
`;

export default (props: Line) => (
  <PlayLineView>
    <TextView>
      <Text>{props.line}</Text>
    </TextView>
  </PlayLineView>
);
