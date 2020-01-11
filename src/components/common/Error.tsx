import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const ErrorView = styled.SafeAreaView`
  display: flex;
  justify-content: center;
`;

type Props = {
  message?: string;
};

const defaultProps = {
  message: "There was a problem..."
};

const Header = ({ message }: Props) => (
  <ErrorView>
    <Text>{message}</Text>
  </ErrorView>
);

Header.defaultProps = defaultProps;

export default Header;
