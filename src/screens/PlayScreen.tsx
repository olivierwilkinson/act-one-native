import React from "react";

import PlayProviders from "../components/play/playProviders/PlayProviders";
import Play from "../components/play/Play";
import Error from "../components/common/error/Error";
import { PlayNavigationProp, PlayRouteProp } from "../types/navigation-types";
import PlayHeaderContainer from "../components/play/playHeader/PlayHeaderContainer";
import PlayHeader from "../components/play/playHeader/PlayHeader";

export type Props = {
  navigation: PlayNavigationProp;
  route: PlayRouteProp;
};

export default ({ navigation, route }: Props) => {
  const playId = route.params?.playId;
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
      <PlayHeaderContainer playId={playId} navigation={navigation} />
      <Play />
    </PlayProviders>
  );
};
