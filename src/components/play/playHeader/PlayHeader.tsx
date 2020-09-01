import React, { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import Header from "../../common/header/Header";
import Playback from "../../../contexts/Playback";
import PlaySettings from "../../../contexts/PlaySettings";
import { bigSizeFont } from "../../../styles/typography";
import { Play } from "../../../types/play-types";
import { PlayNavigationProp } from "../../../types/navigation-types";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export type Props = {
  play?: Play;
  navigation: PlayNavigationProp;
};

export default ({ play, navigation }: Props) => {
  const { stop } = useContext(Playback);
  const { openSettings } = useContext(PlaySettings);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={play?.title}
          left={{
            view: <HeaderText>Back</HeaderText>,
            onPress: () => navigation.pop()
          }}
          right={{
            onPress: () => {
              stop();
              openSettings();
            },
            view: <Ionicons name="ios-settings" color="white" size={28} />
          }}
        />
      )
    });
  }, [navigation, openSettings, stop]);

  return null;
};
