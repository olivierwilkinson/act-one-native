import React, { ReactNode } from "react";

import PlaybackProvider from "./playbackProvider/PlaybackProvider";
import PlayNavigationProvider from "./playNavigationProvider/PlayNavigationProvider";
import PlayPositionProvider from "./playPositionProvider/PlayPositionProvider";
import PlaySettingsProvider from "./playSettingsProvider/PlaySettingsProvider";

import { Play } from "../../../types/play-types";

export type Props = {
  play: Play;
  children: ReactNode;
};

const PlayProviders = ({ play, children }: Props) => (
  <PlaySettingsProvider play={play}>
    <PlayPositionProvider play={play}>
      <PlayNavigationProvider play={play}>
        <PlaybackProvider>{children}</PlaybackProvider>
      </PlayNavigationProvider>
    </PlayPositionProvider>
  </PlaySettingsProvider>
);

export default PlayProviders;
