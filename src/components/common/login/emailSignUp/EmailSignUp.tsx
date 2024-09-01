import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { bigSizeFont, buttonFont } from "../../../../styles/typography";
import {
  lightGray,
  mediumGray,
  mediumLightGray
} from "../../../../styles/colours";
import { apiBaseUrl } from "../../../../services/baseUrls";
import parseConnectCookie from "../../../../helpers/parseCookie";
import UnstyledInputLabel from "../../inputLabel/InputLabel";
import Input from "../../input/Input";
import UnstyledSubmitButton from "../../submitButton/SubmitButton";
import Button from "../../button/Button";

const Container = styled.ScrollView`
  padding-top: 30px;
  background: ${lightGray}
  height: 100%;
`;

const Header = styled.View`
  display: flex;
  align-items: center;
  width: 80%;
  min-width: 230px;
  border-bottom-width: 1px;
  border-bottom-color: ${mediumLightGray};
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: ${mediumGray};
  font-weight: 500;
  padding-bottom: 10px;
`;

const EmailPasswordForm = styled.View`
  width: 80%;
  max-width: 300px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.View`
  width: 100%;
`;

const InputLabel = styled(UnstyledInputLabel)`
  margin-bottom: 5px;
`;

const SubmitButton = styled(UnstyledSubmitButton)`
  width: 100%;
  margin-top: 10px;
`;

const CancelButton = styled(Button)`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 0;
`;

const ButtonText = styled.Text`
  ${buttonFont}
  font-family: "Roboto_500Medium";
  margin: 0;
`;

const ErrorText = styled.Text`
  color: red;
  margin-top: 20px;
  width: 80%;
  text-align: center;
`;

export type Props = {
  onLogin: () => void;
  onCancelPress: () => void;
};

export const EmailSignUp = ({ onLogin, onCancelPress }: Props) => {
  const { mutate: signUp, error, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
      confirmPassword
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      if (!email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const res = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.status === 401) {
        throw new Error(
          "Unable to Sign Up. The provided email and password were invalid."
        );
      }

      if (!res.ok) {
        throw new Error("Unable to Sign Up. Please try again later.");
      }

      const cookie = res.headers.get("set-cookie");
      if (!cookie) {
        throw new Error("Unable to Log In. Please try again later.");
      }

      const connectCookie = parseConnectCookie(cookie);
      if (!connectCookie) {
        throw new Error("Unable to Log In. Please try again later.");
      }

      await AsyncStorage.setItem(apiBaseUrl, connectCookie);
    },

    onSuccess: () => onLogin()
  });

  const passwordInputRef = useRef<TextInput | null>(null);
  const confirmPasswordInputRef = useRef<TextInput | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      bounces={false}
      contentContainerStyle={{ display: "flex", alignItems: "center" }}
    >
      <Header>
        <HeaderText>Sign Up</HeaderText>
      </Header>

      <EmailPasswordForm>
        <InputWrapper>
          <InputLabel>Email</InputLabel>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email here..."
            inputMode="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            numberOfLines={1}
            readOnly={isPending}
            aria-disabled={isPending}
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Password</InputLabel>
          <Input
            ref={passwordInputRef}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password here..."
            clearTextOnFocus
            returnKeyType="next"
            textContentType="newPassword"
            numberOfLines={1}
            readOnly={isPending}
            aria-disabled={isPending}
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            secureTextEntry
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>Confirm Password</InputLabel>
          <Input
            ref={confirmPasswordInputRef}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password here..."
            clearTextOnFocus
            returnKeyType="done"
            textContentType="newPassword"
            numberOfLines={1}
            readOnly={isPending}
            aria-disabled={isPending}
            onSubmitEditing={() => signUp({ email, password, confirmPassword })}
            secureTextEntry
          />
        </InputWrapper>

        <SubmitButton
          disabled={isPending}
          onPress={() => signUp({ email, password, confirmPassword })}
        >
          Sign Up
        </SubmitButton>
      </EmailPasswordForm>

      {!isPending && (
        <CancelButton onPress={() => onCancelPress()}>
          <ButtonText>Cancel</ButtonText>
        </CancelButton>
      )}

      {isPending && <ActivityIndicator size="large" color={mediumGray} />}

      {error && <ErrorText>{error.message}</ErrorText>}
    </Container>
  );
};
