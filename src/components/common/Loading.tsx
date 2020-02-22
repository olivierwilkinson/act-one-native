import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { bigSizeFont } from "../../styles/typography";

const LoadingView = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MessageText = styled.Text`
  ${bigSizeFont}
  margin-top: 10px;
`;

type Props = {
  message?: string;
  size?: number | "small" | "large";
};

const defaultProps = {
  size: "large"
};

const Loading = ({ message, size }: Props) => (
  <LoadingView>
    <ActivityIndicator size={size} animating />
    {message && <MessageText>{message}</MessageText>}
  </LoadingView>
);

Loading.defaultProps = defaultProps;

export default Loading;
