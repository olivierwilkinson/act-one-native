import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import { Platform, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import styled from "styled-components/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../googleLogo/GoogleLogo";
import Button from "../../common/button/Button";
import { buttonFont } from "../../../styles/typography";
import { mediumGray } from "../../../styles/colours";
// import { apiBaseUrl } from "../../../services/baseUrls";
// import { useAutoDiscovery } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const ButtonText = styled.Text`
  ${buttonFont}
  font-family: "Roboto_500Medium";
`;

const LoadingWrapper = styled.View`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type GoogleAuth = {
  developmentClientId?: string;
  iosClientId?: string;
  androidClientId?: string;
};

const getClientId = () => {
  const google: GoogleAuth = Constants.expoConfig?.extra?.googleAuth || {};

  if (Constants.appOwnership === "expo") {
    return google.developmentClientId;
  }

  switch (Platform.OS) {
    case "ios":
      return google.iosClientId;
    case "android":
      return google.androidClientId;
    default:
      return "";
  }
};

export type Props = {
  onLogin: () => void;
  disabled?: boolean;
};

export default function GoogleSignInButton({
  // onLogin,
  disabled = false
}: Props) {
  const clientId = getClientId();
  if (!clientId) {
    return null;
  }

  const [isLoggingIn] = useState(false);

  // const [_, __, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId,
  //   redirectUri: `${apiBaseUrl}/auth/google/callback`
  // });

  const login = async () => {
    // TODO:- Reimplement Google Auth with expo 51
    return;

    // setIsLoggingIn(true);

    // const result = await promptAsync();

    // if (result.type === "success") {
    //   const { cookie } = result.params;
    //   await AsyncStorage.setItem(apiBaseUrl, cookie);
    // }

    // await onLogin();
    // setIsLoggingIn(false);
  };

  if (isLoggingIn) {
    return (
      <LoadingWrapper>
        <ActivityIndicator size="large" color={mediumGray} />
      </LoadingWrapper>
    );
  }

  return (
    <Button
      disabled={disabled}
      onPress={() => {
        login();
      }}
    >
      <Logo disabled={disabled} />
      <ButtonText>SIGN IN WITH GOOGLE</ButtonText>
    </Button>
  );
}
