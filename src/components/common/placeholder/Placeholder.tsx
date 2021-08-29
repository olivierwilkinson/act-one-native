import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { subFont, bigSizeFont, buttonFont } from "../../../styles/typography";
import { secondaryColour, darkGray } from "../../../styles/colours";
import Button from "../button/Button";

const PlaceholderView = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  ${bigSizeFont}
  ${subFont}
  color: ${darkGray}
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
  error?: boolean;
  size?: number | "small" | "large";
  retry?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default ({
  message,
  loading = false,
  error = false,
  size = "large",
  retry,
  style
}: Props) => (
  <PlaceholderView style={style}>
    {message && <MessageText>{message}</MessageText>}
    {loading && <ActivityIndicator size={size} animating />}
    {error && !loading && retry && (
      <RetryButton onPress={retry}>
        <SimpleLineIcons name="refresh" size={24} color={secondaryColour} />
        <ButtonText>Retry</ButtonText>
      </RetryButton>
    )}
  </PlaceholderView>
);
