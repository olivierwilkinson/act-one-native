import React, { ReactNode } from "react";
import { useMemoOne } from "use-memo-one";
import { ApolloProvider } from "@apollo/client";

import createClient from "../../../apollo/client";
import RecordingProvider from "../recordingProvider/RecordingProvider";
import SoundProvider from "../soundProvider/SoundProvider";
import { AuthProvider } from "../../../contexts/Auth";
import { PermissionsProvider } from "../../../contexts/Permissions";
import { AudioProvider } from "../../../contexts/Audio";

export type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
  const client = useMemoOne(createClient, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <PermissionsProvider>
          <RecordingProvider>
            <SoundProvider>
              <AudioProvider>{children}</AudioProvider>
            </SoundProvider>
          </RecordingProvider>
        </PermissionsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
