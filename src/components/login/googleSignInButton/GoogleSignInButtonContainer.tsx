import React from "react";

import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "../../app/authProvider/AuthProvider";

export default function GoogleSignInButtonContainer() {
  const { setAuth } = useAuth();
  return <GoogleSignInButton onSignIn={setAuth} />;
}
