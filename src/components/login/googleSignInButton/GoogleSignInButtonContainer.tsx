import React from "react";

import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "../../app/authProvider/AuthProvider";

export default function GoogleSignInButtonContainer() {
  const { setUser } = useAuth();
  return <GoogleSignInButton onSignIn={setUser} />;
}
