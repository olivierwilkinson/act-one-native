import React from "react";
import { View, Button } from "react-native";
import Constants from "expo-constants";

import GoogleSignInButton from "../components/login/googleSignInButton/GoogleSignInButton";
import request from "../helpers/request";

const { apiBaseUrl } = Constants.manifest.extra || {};

export default function Login() {
  return (
    <View>
      <GoogleSignInButton />
      <Button
        title="LOGOUT"
        onPress={() => {
          request(`${apiBaseUrl}/auth/logout`, {
            method: "POST",
            body: "{}"
          })
            .then(res => console.log(res.status))
            .catch(console.log);
        }}
      ></Button>
    </View>
  );
}
