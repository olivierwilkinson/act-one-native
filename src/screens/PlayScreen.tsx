import React from "react";
import styled from "styled-components/native";

import PlayProviders from "../components/play/playProviders/PlayProviders";
import UnstyledPlay from "../components/play/Play";
import Error from "../components/common/error/Error";
import {
  MainStackParamList,
  PlayNavigationProp,
  PlayRouteProp
} from "../types/navigation-types";
import PlaySettingsModalContainer from "../components/play/playSettingsModal/PlaySettingsModalContainer";
import PlayHeaderContainer from "../components/play/playHeader/PlayHeaderContainer";
import { StackHeaderProps } from "@react-navigation/stack";

const Play = styled(UnstyledPlay)`
  height: 100%;
`;

export type Props = {
  route: PlayRouteProp;
  navigation: PlayNavigationProp;
};

export const Screen = ({ route: { params }, navigation }: Props) => {
  const { playId, showSettings } = params || {};
  if (!playId) {
    return <Error message="Play could not be loaded" />;
  }

  return (
    <PlayProviders playId={playId}>
      <Play />

      <PlaySettingsModalContainer
        playId={playId}
        visible={!!showSettings}
        onClose={() => navigation.setParams({ showSettings: false })}
      />
    </PlayProviders>
  );
};

export const Header = ({ route: { params }, navigation }: StackHeaderProps) => {
  const { playId } = (params as MainStackParamList["Play"]) || {};
  return (
    <PlayHeaderContainer
      playId={playId}
      onBackPress={() => navigation.pop()}
      onSettingsPress={() => navigation.setParams({ showSettings: true })}
    />
  );
};
