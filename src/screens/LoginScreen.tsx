import React from "react";
import { View, Button } from "react-native";
import Constants from "expo-constants";

import GoogleSignInButtonContainer from "../components/login/googleSignInButton/GoogleSignInButtonContainer";
import request from "../helpers/request";

const { apiBaseUrl } = Constants.manifest.extra;

export default function Login() {
  return (
    <View>
      <GoogleSignInButtonContainer />
      <Button
        title="LOGOUT"
        onPress={() => {
          request(`${apiBaseUrl}/auth/logout`, {
            method: "POST",
            body: "{}",
          })
            .then((res) => console.log(res.status))
            .catch(console.log);
        }}
      ></Button>
    </View>
  );
}
