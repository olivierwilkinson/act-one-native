import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
  useAutoDiscovery,
  Prompt
} from "expo-auth-session";
import { Platform } from "react-native";
import Constants from "expo-constants";
import styled from "styled-components/native";

import { Tokens, UserInfo } from "../../app/authProvider/AuthProvider";
import Logo from "../googleLogo/GoogleLogo";

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

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

async function fetchUserInfo(token: string) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.json();
}

const formatGoogleUserInfo = (gInfo: GoogleUserInfo) => ({
  familyName: gInfo["family_name"],
  givenName: gInfo["given_name"],
  id: gInfo["id"],
  locale: gInfo["locale"],
  name: gInfo["name"],
  picture: gInfo["picture"]
});

export type GoogleUserInfo = {
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
};

export type Props = {
  onSignIn: (auth: { tokens: Tokens; user: UserInfo }) => void;
};

export default function GoogleSignInButton({ onSignIn }: Props) {
  const [fetchingUserInfo, setFetchingUserInfo] = useState(false);
  const [depressed, setDepressed] = useState(false);
  const clientId = getClientId();
  if (!clientId) {
    return null;
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      usePKCE: false,
      responseType: ResponseType.Token,
      clientId,
      redirectUri: makeRedirectUri({
        useProxy
      }),
      scopes: ["openid", "profile"],
      prompt: Prompt.SelectAccount
    },
    useAutoDiscovery("https://accounts.google.com")
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      setFetchingUserInfo(true);
      fetchUserInfo(access_token)
        .then((userInfo: GoogleUserInfo) =>
          onSignIn({
            tokens: { accessToken: access_token },
            user: formatGoogleUserInfo(userInfo)
          })
        )
        .catch(console.error)
        .finally(() => setFetchingUserInfo(false));
    }
  }, [response]);

  const disabled = !request || fetchingUserInfo;

  return (
    <Button
      disabled={disabled}
      onPress={() => {
        promptAsync({ useProxy });
      }}
      onPressIn={() => setDepressed(true)}
      onPressOut={() => setDepressed(false)}
      activeOpacity={1}
      depressed={depressed}
    >
      <ButtonContent>
        <Logo disabled={disabled} />
        <ButtonText>SIGN IN WITH GOOGLE</ButtonText>
      </ButtonContent>
    </Button>
  );
}
