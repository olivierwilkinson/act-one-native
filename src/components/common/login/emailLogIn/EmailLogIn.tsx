import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Pressable, Text, TextInput } from "react-native";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { bigSizeFont, buttonFont } from "../../../../styles/typography";
import {
  lightGray,
  mediumGray,
  mediumLightGray,
  tertiaryColour
} from "../../../../styles/colours";
import { apiBaseUrl } from "../../../../services/baseUrls";
import parseConnectCookie from "../../../../helpers/parseCookie";
import Button from "../../button/Button";
import UnstyledInputLabel from "../../inputLabel/InputLabel";
import Input from "../../input/Input";
import UnstyledSubmitButton from "../../submitButton/SubmitButton";

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

const SwitchSignUpAndLoginWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const LinkText = styled.Text`
  color: ${tertiaryColour};
  font-weight: 500;
`;

export type Props = {
  onLogin: () => void;
  onSignUpPress: () => void;
  onCancelPress: () => void;
};

export const EmailLogIn = ({
  onLogin,
  onSignUpPress,
  onCancelPress
}: Props) => {
  const { mutate: logIn, error, isPending } = useMutation({
    mutationFn: async ({
      email,
      password
    }: {
      email: string;
      password: string;
    }) => {
      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.status === 401) {
        throw new Error(
          "Unable to Log In. The provided email and password were not recognised."
        );
      }

      if (!res.ok) {
        throw new Error("Unable to Log In. Please try again later.");
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      bounces={false}
      contentContainerStyle={{ display: "flex", alignItems: "center" }}
    >
      <Header>
        <HeaderText>Log In</HeaderText>
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
            returnKeyType="done"
            textContentType="password"
            numberOfLines={1}
            readOnly={isPending}
            aria-disabled={isPending}
            onSubmitEditing={() => logIn({ email, password })}
            secureTextEntry
          />
        </InputWrapper>

        <SubmitButton
          disabled={isPending}
          onPress={() => logIn({ email, password })}
        >
          Log In
        </SubmitButton>
      </EmailPasswordForm>

      {!isPending && (
        <CancelButton onPress={() => onCancelPress()}>
          <ButtonText>Cancel</ButtonText>
        </CancelButton>
      )}

      {isPending && <ActivityIndicator size="large" color={mediumGray} />}

      {error && <ErrorText>{error.message}</ErrorText>}

      {!isPending && (
        <SwitchSignUpAndLoginWrapper>
          <Pressable onPress={() => onSignUpPress()}>
            <Text>
              Don't have an account? <LinkText>Sign&nbsp;Up</LinkText>
            </Text>
          </Pressable>
        </SwitchSignUpAndLoginWrapper>
      )}
    </Container>
  );
};
