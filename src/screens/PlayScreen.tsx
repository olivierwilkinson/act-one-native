import React from "react";

import PlayProviders from "../components/play/playProviders/PlayProviders";
import Play from "../components/play/Play";
import Error from "../components/common/Error";
import { PlayNavigationProp, PlayRouteProp } from "../types/navigation-types";
import PlayHeader from "../components/play/PlayHeader";

export type Props = {
  navigation: PlayNavigationProp;
  route: PlayRouteProp;
};

export default ({ navigation, route }: Props) => {
  const play = route.params?.play;
  if (!play) {
    return (
      <>
        <PlayHeader play={play} navigation={navigation} />
        <Error message="Play could not be loaded" />
      </>
    );
  }

  return (
    <PlayProviders play={play}>
      <PlayHeader play={play} navigation={navigation} />
      <Play play={play} />
    </PlayProviders>
  );
};
