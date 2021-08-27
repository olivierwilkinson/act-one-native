import React, { ReactNode } from "react";

import { PlayNavigationProvider } from "../../../contexts/PlayNavigation";
import { PlaySettingsProvider } from "../../../contexts/PlaySettings";
import { PlayPositionProvider } from "../../../contexts/PlayPosition";
import { PlaybackProvider } from "../../../contexts/Playback";

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
