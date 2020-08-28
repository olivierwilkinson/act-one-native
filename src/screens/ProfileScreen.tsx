import React from "react";

import { useAuth } from "../components/app/authProvider/AuthProvider";
import Profile from "../components/profile/Profile";
import { ProfileNavigationProp } from "../types/navigation-types";
import LoginContainer from "../components/app/login/LoginContainer";

export type Props = {
  navigation: ProfileNavigationProp;
};

export default function ProfileScreen() {
  const { user } = useAuth();
  if (!user) {
    return <LoginContainer message="Sign In to access your profile" />;
  }

  return <Profile name={user.name || ""} picture={user.picture || ""} />;
}
