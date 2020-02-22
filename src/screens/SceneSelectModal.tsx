import React from "react";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";

import { Play } from "../types/play-types";
import SceneSelect from "../components/sceneSelectModal/SceneSelect";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import { navigateToPlay } from "../helpers/navigation";
import { bigSizeFont } from "../styles/typography";
import { PlaySettings } from "../contexts/PlaySettings";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

type Params = {
  play: Play;
  settings: PlaySettings;
};

export default class SceneSelectModal extends React.Component<
  NavigationStackScreenProps<Params>
> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play?.play}
        right={{
          onPress: () => navigation.pop(),
          view: <HeaderText>Cancel</HeaderText>
        }}
      />
    )
  });

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;
    const settings = navigation.state.params?.settings || {};

    if (!play) {
      return <Error message="Unable to load Play" />;
    }

    return (
      <SceneSelect
        play={play}
        settings={settings}
        onScenePress={({ act, scene }) =>
          navigateToPlay(navigation, play, {
            ...settings,
            act,
            scene
          })
        }
      />
    );
  }
}
