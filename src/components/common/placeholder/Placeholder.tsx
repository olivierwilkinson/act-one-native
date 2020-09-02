import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { subFont, bigSizeFont, buttonFont } from "../../../styles/typography";
import { secondaryColour } from "../../../styles/colours";
import Button from "../button/Button";

const PlaceholderView = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MessageText = styled.Text`
  ${bigSizeFont}
  ${subFont}
  margin: 10px 0 20px 0;
`;

const RetryButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

const ButtonText = styled.Text`
  ${buttonFont};
  margin: 0;
`;

export type Props = {
  message?: string;
  loading?: boolean;
  size?: number | "small" | "large";
  retry?: () => void;
};

export default ({
  message,
  loading = false,
  size = "large",
  retry = () => {}
}: Props) => (
  <PlaceholderView>
    {loading && <ActivityIndicator size={size} animating />}
    {message && <MessageText>{message}</MessageText>}
    <RetryButton onPress={retry}>
      <SimpleLineIcons name="refresh" size={24} color={secondaryColour} />
      <ButtonText>Retry</ButtonText>
    </RetryButton>
  </PlaceholderView>
);
