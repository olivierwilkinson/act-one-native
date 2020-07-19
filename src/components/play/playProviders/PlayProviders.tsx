import React, { ReactNode } from "react";

import PlaybackProvider from "../playbackProvider/PlaybackProvider";
import PlayNavigationProvider from "../playNavigationProvider/PlayNavigationProvider";
import PlayPositionProvider from "../playPositionProvider/PlayPositionProvider";
import PlaySettingsProvider from "../playSettingsProvider/PlaySettingsProvider";

import { Play } from "../../../types/play-types";
import PlayProvider from "../playProvider/PlayProvider";

export type Props = {
  play: Play;
  children: ReactNode;
};

const PlayProviders = ({ play, children }: Props) => (
  <PlayProvider play={play}>
    <PlaySettingsProvider play={play}>
      <PlayPositionProvider play={play}>
        <PlayNavigationProvider play={play}>
          <PlaybackProvider>{children}</PlaybackProvider>
        </PlayNavigationProvider>
      </PlayPositionProvider>
    </PlaySettingsProvider>
  </PlayProvider>
);

export default PlayProviders;
