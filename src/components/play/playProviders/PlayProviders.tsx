import React, { ReactNode } from "react";

import PlaybackProvider from "../playbackProvider/PlaybackProvider";
import PlayNavigationProvider from "../playNavigationProvider/PlayNavigationProvider";
import PlaySettingsProvider from "../playSettingsProvider/PlaySettingsProvider";
import { PlayPositionProvider } from "../../../contexts/PlayPosition";

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
