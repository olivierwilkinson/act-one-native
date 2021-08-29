import React from "react";
import styled from "styled-components/native";

import UnstyledPlayListContainer from "../components/home/playList/PlayListContainer";
import { TabsNavigationProp } from "../types/navigation-types";

const PlayListContainer = styled(UnstyledPlayListContainer)`
  height: 100%;
`;

export type Props = {
  navigation: TabsNavigationProp;
};

export default class HomeScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <PlayListContainer
        goToPlay={playId => navigation.navigate("Play", { playId })}
      />
    );
  }
}
