import React from "react";
import styled from "styled-components/native";

import UnstyledPlayListContainer from "../components/home/playList/PlayListContainer";
import { TabsNavigationProp } from "../types/navigation-types";
import { useNavigation } from "@react-navigation/native";

const PlayListContainer = styled(UnstyledPlayListContainer)`
  height: 100%;
`;

export type Props = {
  navigation: TabsNavigationProp;
};

export default function HomeScreen() {
  const navigation = useNavigation<TabsNavigationProp>();

  return (
    <PlayListContainer
      goToPlay={playId => navigation.navigate("Play", { playId })}
    />
  );
}
