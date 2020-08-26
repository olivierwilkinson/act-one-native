import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { startAsync } from "expo-auth-session";
import { Platform } from "react-native";
import Constants from "expo-constants";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";

import Logo from "../googleLogo/GoogleLogo";

WebBrowser.maybeCompleteAuthSession();

const getButtonBackground = ({
  depressed,
  disabled
}: {
  depressed: boolean;
  disabled: boolean;
}) => {
  if (disabled) {
    return "rgba(0,0,0,0.08)";
  }

  if (depressed) {
    return "#eee";
  }

  return "#fff";
};

const Button = styled.TouchableOpacity`
  height: 40px;
  margin: auto;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${getButtonBackground};
  box-shadow: 1px 1px 1px grey;
  background-color: ${getButtonBackground};
`;

const ButtonContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #000;
  opacity: 0.54;
  padding: 0 8px;
  margin-right: 24px;
  font-size: 14px;
  font-family: "Roboto_500Medium";
`;

type GoogleAuth = {
  developmentClientId?: string;
  iosClientId?: string;
  androidClientId?: string;
};

const getClientId = () => {
  const google: GoogleAuth = Constants.manifest?.extra?.googleAuth || {};

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

export default function GoogleSignInButton() {
  const [depressed, setDepressed] = useState(false);
  const clientId = getClientId();
  if (!clientId) {
    return null;
  }

  const { apiBaseUrl } = Constants.manifest.extra;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const login = async () => {
    setIsLoggingIn(true);

    const result = await startAsync({
      authUrl: `${apiBaseUrl}/auth/google`
    });

    if (result.type === "success") {
      const { cookie } = result.params;
      await AsyncStorage.setItem(apiBaseUrl, cookie);
    }

    setIsLoggingIn(false);
  };

  return (
    <Button
      disabled={isLoggingIn}
      onPress={() => {
        login();
      }}
      onPressIn={() => setDepressed(true)}
      onPressOut={() => setDepressed(false)}
      activeOpacity={1}
      depressed={depressed}
    >
      <ButtonContent>
        <Logo disabled={isLoggingIn} />
        <ButtonText>SIGN IN WITH GOOGLE</ButtonText>
      </ButtonContent>
    </Button>
  );
}
