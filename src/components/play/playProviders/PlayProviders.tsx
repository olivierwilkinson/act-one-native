import React, { ReactNode } from "react";

import PlaybackProvider from "../playbackProvider/PlaybackProvider";
import PlayNavigationProvider from "../playNavigationProvider/PlayNavigationProvider";
import PlayPositionProvider from "../playPositionProvider/PlayPositionProvider";
import PlaySettingsProvider from "../playSettingsProvider/PlaySettingsProvider";

export type Props = {
  playId: number;
  children: ReactNode;
};

const PlayProviders = ({ playId, children }: Props) => (
  <PlaySettingsProvider playId={playId}>
    <PlayPositionProvider playId={playId}>
      <PlayNavigationProvider playId={playId}>
        <PlaybackProvider>{children}</PlaybackProvider>
      </PlayNavigationProvider>
    </PlayPositionProvider>
  </PlaySettingsProvider>
);

export default PlayProviders;
