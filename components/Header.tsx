import React from "react";
import { Header, Body, Title } from "native-base";
import styled from "styled-components";
import { StatusBar } from "react-native";

import { primaryColour } from "../styles/colours.js";

const PrimaryHeader = styled(Header)`
  background-color: ${primaryColour};
`;

const WhiteTitle = styled(Title)`
  color: white;
`;

export default function PlayList() {
  return (
    <PrimaryHeader>
      <StatusBar barStyle="light-content" />
      <Body>
        <WhiteTitle>ActOne</WhiteTitle>
      </Body>
    </PrimaryHeader>
  );
}
