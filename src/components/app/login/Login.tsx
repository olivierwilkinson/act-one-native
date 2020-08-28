import React from "react";
import styled from "styled-components/native";

import GoogleSignInButton from "../googleSignInButton/GoogleSignInButton";
import { mediumDarkGray, lightGray } from "../../../styles/colours";
import logo from "../../../../assets/images/app-logo-text-640.png";

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
  margin: auto;
  margin-top: 0;
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

export type Props = {
  message?: string;
  onLogin: () => void;
  disabled?: boolean;
};

export default function Login({
  message = "",
  onLogin,
  disabled = false
}: Props) {
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
        <GoogleSignInButton onLogin={onLogin} disabled={disabled} />
      </LoginButtonsWrapper>
    </Container>
  );
}
