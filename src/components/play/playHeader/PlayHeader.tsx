import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import Header from "../../common/header/Header";
import { bigSizeFont } from "../../../styles/typography";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export type Props = {
  title?: string;
  onBackPress: () => void;
  onSettingsPress?: () => void;
};

export default ({ title, onBackPress, onSettingsPress = () => {} }: Props) => {
  return (
    <Header
      title={title}
      left={{
        view: <HeaderText>Back</HeaderText>,
        onPress: onBackPress
      }}
      right={{
        view: <Ionicons name="ios-settings" color="white" size={28} />,
        onPress: onSettingsPress
      }}
    />
  );
};
