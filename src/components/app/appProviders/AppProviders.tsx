import React, { ReactNode } from "react";

import AudioProvider from "../audioProvider/AudioProvider";
import PermissionsProvider from "../permissionsProvider/PermissionsProvider";
import RecordingProvider from "../recordingProvider/RecordingProvider";
import SoundProvider from "../soundProvider/SoundProvider";
import AuthProvider from "../authProvider/AuthProvider";

export type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => (
  <AuthProvider>
    <PermissionsProvider>
      <RecordingProvider>
        <SoundProvider>
          <AudioProvider>{children}</AudioProvider>
        </SoundProvider>
      </RecordingProvider>
    </PermissionsProvider>
  </AuthProvider>
);

export default AppProviders;
