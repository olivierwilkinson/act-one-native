import React, { useState } from "react";

import PlayProviders from "../components/play/playProviders/PlayProviders";
import Play from "../components/play/Play";
import Error from "../components/common/error/Error";
import { PlayNavigationProp, PlayRouteProp } from "../types/navigation-types";
import PlayHeaderContainer from "../components/play/playHeader/PlayHeaderContainer";
import PlayHeader from "../components/play/playHeader/PlayHeader";
import PlaySettingsModalContainer from "../components/play/playSettingsModal/PlaySettingsModalContainer";

export type Props = {
  navigation: PlayNavigationProp;
  route: PlayRouteProp;
};

export default ({ navigation, route: { params } }: Props) => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  const { playId } = params || {};
  if (!playId) {
    return (
      <>
        <PlayHeader
          navigation={navigation}
          onBackPress={() => navigation.pop()}
        />
        <Error message="Play could not be loaded" />
      </>
    );
  }

  return (
    <PlayProviders playId={playId}>
      <PlayHeaderContainer
        playId={playId}
        navigation={navigation}
        onSettingsPress={() => setSettingsVisible(true)}
      />

      <Play />

      <PlaySettingsModalContainer
        playId={playId}
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </PlayProviders>
  );
};
