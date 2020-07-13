import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { subFont } from "../../../styles/typography";

const LoadingView = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MessageText = styled.Text`
  ${subFont}
  margin-top: 10px;
`;

export type Props = {
  message?: string;
  size?: number | "small" | "large";
};

export default ({ message, size = "large" }: Props) => (
  <LoadingView>
    <ActivityIndicator size={size} animating />
    {message && <MessageText>{message}</MessageText>}
  </LoadingView>
);
