import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components/native";

import GoogleSignInButton from "../../app/googleSignInButton/GoogleSignInButton";
import { mediumDarkGray, lightGray } from "../../../styles/colours";
import logo from "../../../../assets/images/app-logo-text-640.png";
import Button from "../button/Button";
import { buttonFont } from "../../../styles/typography";
import GET_USER from "../../../graphql/queries/GetUser.graphql";
import { GetUser } from "../../../graphql/queries/types/GetUser";
import { EmailLogIn } from "./emailLogIn/EmailLogIn";
import { EmailSignUp } from "./emailSignUp/EmailSignUp";

const Container = styled.View`
  display: flex;
  align-items: center;
  padding-top: 30px;
  background: ${lightGray}
  height: 100%;
`;

const LogoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
`;

const Logo = styled.Image`
  margin-bottom: -15%;
  height: 200px;
`;

const Spacer = styled.View`
  height: 30px;
`;

const LoginButtonsWrapper = styled.View`
  padding: 30px;
  padding-top: 0;
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

const CallToActionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: rgb(220, 220, 220);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const CallToAction = styled.Text`
  font-weight: 200
  color: ${mediumDarkGray};
  font-size: 20px;
  padding: 10px;
`;

const EmailSignInButton = styled(Button)`
  width: 235px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const EmailImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const ButtonText = styled.Text`
  ${buttonFont}
  font-family: "Roboto_500Medium";
`;

export type Props = {
  message?: string;
  onLogin?: () => void;
  disabled?: boolean;
};

export default function Login({
  message = "",
  onLogin: onLoginProp = () => {}
}: Props) {
  const { refetch, loading } = useQuery<GetUser>(GET_USER);

  const [mode, setMode] = useState<"choices" | "email-login" | "email-signup">(
    "choices"
  );

  const onLogin = useCallback(() => {
    refetch();
    onLoginProp();
  }, [refetch, onLoginProp]);

  if (mode === "email-login") {
    return (
      <EmailLogIn
        onLogin={onLogin}
        onSignUpPress={() => setMode("email-signup")}
        onCancelPress={() => setMode("choices")}
      />
    );
  }

  if (mode === "email-signup") {
    return (
      <EmailSignUp onLogin={onLogin} onCancelPress={() => setMode("choices")} />
    );
  }

  return (
    <Container>
      <LogoContainer>
        <Logo
          source={logo}
          style={{
            // use style object to avoid prettier changing resizeMode to resizemode
            resizeMode: "contain"
          }}
        />
      </LogoContainer>

      <Spacer />

      <CallToActionContainer>
        <CallToAction>{message}</CallToAction>
      </CallToActionContainer>

      <LoginButtonsWrapper>
        <GoogleSignInButton
          disabled={loading}
          onLogin={() => {
            refetch();
            onLogin();
          }}
        />

        <EmailSignInButton
          onPress={() => setMode("email-login")}
          disabled={loading}
        >
          <EmailImage source={require("../../../../assets/images/email.png")} />
          <ButtonText>SIGN IN WITH EMAIL</ButtonText>
        </EmailSignInButton>
      </LoginButtonsWrapper>
    </Container>
  );
}
