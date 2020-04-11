import React from "react";
import styled from "styled-components/native";
import {
  NavigationStackScreenProps,
  NavigationStackProp
} from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";

import { Play as PlayType } from "../types/play-types";
import PlayPositionProvider from "../components/play/PlayPositionProvider";
import Play from "../components/play/Play";
import Header, { Props as HeaderProps } from "../components/common/Header";
import Error from "../components/common/Error";
import PageLoading from "../components/common/PageLoading";
import { bigSizeFont } from "../styles/typography";
import { openPlaySettings } from "../helpers/navigation";
import { getStoredSettings, setStoredSettings } from "../helpers/storage";
import PlaySettingsContext, { PlaySettings } from "../contexts/PlaySettings";
import PlayNavigationProvider from "../components/play/PlayNavigationProvider";
import AudioProvider from "../components/play/AudioProvider";

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
    header: () => {
      const params = navigation.state.params || {};
      const { play, settings } = params;
      let props: HeaderProps = {
        left: {
          view: <HeaderText>Back</HeaderText>,
          onPress: () => navigation.pop()
        }
      };

      if (play || settings) {
        props = {
          ...props,
          title: play.play,
          right: {
            onPress: () => openPlaySettings(navigation, play, settings),
            view: <Ionicons name="ios-settings" color="white" size={28} />
          }
        };
      }

      return <Header {...props} />;
    }
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

    this.props.navigation.setParams({ settings: settings || {} });
  };

  render() {
    const { navigation } = this.props;
    const play = navigation.state.params?.play;
    const settings = navigation.state.params?.settings;

    if (!play) {
      return <Error message="Play could not be loaded" />;
    }

    if (!settings) {
      return <PageLoading message={`Loading ${play.play}...`} />;
    }

    return (
      <PlaySettingsContext.Provider value={settings}>
        <PlayPositionProvider play={play} settings={settings}>
          <PlayNavigationProvider
            navigation={navigation}
            play={play}
            settings={settings}
          >
            <AudioProvider>
              <Play play={play} />
            </AudioProvider>
          </PlayNavigationProvider>
        </PlayPositionProvider>
      </PlaySettingsContext.Provider>
    );
  }
}
