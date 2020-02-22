import React from "react";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import { Play as PlayType } from "../types/play-types";
import Play from "../components/play/Play";
import Header from "../components/common/Header";
import Error from "../components/common/Error";
import { bigSizeFont } from "../styles/typography";
import { openPlaySettings } from "../helpers/navigation";
import { getStoredSettings, setStoredSettings } from "../helpers/storage";
import { PlaySettings, initialSettings } from "../contexts/PlaySettings";

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

export type Params = { play: PlayType; settings?: PlaySettings };
export type Props = NavigationStackScreenProps<Params>;

export default class PlayScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationStackProp;
  }) => ({
    header: () => (
      <Header
        title={navigation.state.params?.play?.play}
        left={{
          view: <HeaderText>Back</HeaderText>,
          onPress: () => navigation.pop()
        }}
        right={{
          onPress: () =>
            openPlaySettings(
              navigation,
              navigation.state.params?.play,
              navigation.state.params?.settings || initialSettings
            ),
          view: <Ionicons name="ios-settings" color="white" size={28} />
        }}
      />
    )
  });

  componentDidMount() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (play) {
      this.syncSettings(play);
    }
  }

  componentDidUpdate() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;
    const settings = navigation.state.params?.settings;

    if (play && settings) {
      setStoredSettings(play, settings);
    }
  }

  syncSettings = async (play: PlayType) => {
    const settings = await getStoredSettings(play);

    if (settings) {
      this.props.navigation.setParams({ settings });
    }
  };

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;

    if (!play) {
      return <Error message="Play could not be loaded" />;
    }

    return (
      <Play
        play={play}
        navigation={navigation}
        settings={navigation.state.params?.settings || initialSettings}
      />
    );
  }
}
