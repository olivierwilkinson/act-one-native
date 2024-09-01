import React from "react";

import { useAuth } from "../contexts/Auth";
import Profile from "../components/profile/Profile";
import { ProfileNavigationProp } from "../types/navigation-types";
import Login from "../components/common/login/Login";

export type Props = {
  navigation: ProfileNavigationProp;
};

export default function ProfileScreen() {
  const { user } = useAuth();
  if (!user) {
    return <Login message="Sign In to access your profile" />;
  }

  return <Profile name={user.name || ""} picture={user.picture || ""} />;
}
