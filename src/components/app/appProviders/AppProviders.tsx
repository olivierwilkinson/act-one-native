import React, { ReactNode } from "react";

import AudioProvider from "./audioProvider/AudioProvider";
import PermissionsProvider from "./permissionsProvider/PermissionsProvider";
import RecordingProvider from "./recordingProvider/RecordingProvider";
import SoundProvider from "./soundProvider/SoundProvider";

export type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => (
  <PermissionsProvider>
    <RecordingProvider>
      <SoundProvider>
        <AudioProvider>{children}</AudioProvider>
      </SoundProvider>
    </RecordingProvider>
  </PermissionsProvider>
);

export default AppProviders;
