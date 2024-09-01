import React, { ReactNode } from "react";
import { useMemoOne } from "use-memo-one";
import { ApolloProvider } from "@apollo/client";

import createClient from "../../../apollo/client";
import { AuthProvider } from "../../../contexts/Auth";
import { RecordingProvider } from "../../../contexts/Recording";
import { SoundProvider } from "../../../contexts/Sound";
import { AudioProvider } from "../../../contexts/Audio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
  const apolloClient = useMemoOne(createClient, []);
  const tanstackQueryClient = useMemoOne(() => new QueryClient(), []);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={tanstackQueryClient}>
        <AuthProvider>
          <RecordingProvider>
            <SoundProvider>
              <AudioProvider>{children}</AudioProvider>
            </SoundProvider>
          </RecordingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default AppProviders;
