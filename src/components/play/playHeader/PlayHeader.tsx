import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import Header from "../../common/header/Header";
import { bigSizeFont } from "../../../styles/typography";
import { PlayNavigationProp } from "../../../types/navigation-types";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export type Props = {
  title?: string;
  onBackPress: () => void;
  onSettingsPress: () => void;
  navigation: PlayNavigationProp;
};

export default ({ title, onBackPress, onSettingsPress, navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
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
      )
    });
  }, [navigation, onBackPress, onSettingsPress]);

  return null;
};
