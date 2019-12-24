import React from "react";
import { Header as BaseHeader, Body, Left, Title } from "native-base";
import { TouchableHighlight } from "react-native";
import styled from "styled-components";
import { StatusBar } from "react-native";

import { primaryColour } from "../styles/colours.js";

const PrimaryHeader = styled(BaseHeader)`
  background-color: ${primaryColour};
`;

const WhiteTitle = styled(Title)`
  color: white;
`;

type Props = {
  title?: string;
  onBackClick?: () => void;
};

const defaultProps = {
  title: "ActOne"
};

const Header = (props: Props) => (
  <PrimaryHeader>
    <StatusBar barStyle="light-content" />

    {props.onBackClick && (
      <Left>
        <TouchableHighlight>Back</TouchableHighlight>
      </Left>
    )}

    <Body>
      <WhiteTitle>ActOne</WhiteTitle>
    </Body>
  </PrimaryHeader>
);

Header.defaultProps = defaultProps;

export default Header;
