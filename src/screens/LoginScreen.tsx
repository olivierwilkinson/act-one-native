import React from "react";
import styled from "styled-components/native";

import GoogleSignInButton from "../components/login/googleSignInButton/GoogleSignInButton";
import { mediumLightGray, mediumDarkGray } from "../styles/colours";
import logo from "../../assets/images/app-logo-text-640.png";

const Container = styled.View`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

const LogoContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const Logo = styled.Image`
  margin-bottom: -15%;
  height: 200px;
`;

const LoginButtonsWrapper = styled.View`
  padding: 30px;
  display: flex;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 0;
`;

const CallToActionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${mediumLightGray};
  margin-bottom: 20px;
  width: 100%;
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
};

export default function Login({ message, onLogin }: Props) {
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

      <LoginButtonsWrapper>
        <CallToActionContainer>
          <CallToAction>{message}</CallToAction>
        </CallToActionContainer>

        <GoogleSignInButton onLogin={onLogin} />
      </LoginButtonsWrapper>
    </Container>
  );
}
