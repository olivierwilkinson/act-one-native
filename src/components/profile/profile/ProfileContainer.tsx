import React from "react";
import { Text } from "react-native";

import { useAuth } from "../../app/authProvider/AuthProvider";
import Profile from "./Profile";

export default function ProfileContainer() {
  const { user } = useAuth();

  if (!user) {
    return <Text>Not Logged In</Text>;
  }

  return <Profile name={user.name || ""} />;
}
