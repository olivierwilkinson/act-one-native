import React from "react";
import {
  Header as BaseHeader,
  Body,
  Left,
  Right,
  Title,
  Button,
  Text
} from "native-base";
import styled from "styled-components";
import { StatusBar } from "react-native";

import { primaryColour } from "../styles/colours.js";

const PrimaryHeader = styled(BaseHeader)`
  background-color: ${primaryColour};
  border-bottom-width: 0px;
`;

const WhiteTitle = styled(Title)`
  color: white;
`;

const WhiteText = styled(Text)`
  color: white;
`;

type Props = {
  title?: string;
  onBack?: () => void;
};

const defaultProps = {
  title: "ActOne"
};

const Header = (props: Props) => (
  <PrimaryHeader>
    <StatusBar barStyle="light-content" />

    <Left>
      {props.onBack && (
        <Button onPress={props.onBack} transparent>
          <WhiteText>Back</WhiteText>
        </Button>
      )}
    </Left>

    <Body>
      <WhiteTitle>{props.title}</WhiteTitle>
    </Body>

    <Right />
  </PrimaryHeader>
);

Header.defaultProps = defaultProps;

export default Header;
