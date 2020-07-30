import React, { useState, ReactNode, createContext, useContext } from "react";

type Props = {
  children: ReactNode;
};

export type UserInfo = {
  familyName: string;
  givenName: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
};

export type Tokens = {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
};

export type AuthContextValue = {
  user?: UserInfo;
  tokens?: Tokens;
  setAuth: (auth: { tokens: Tokens; user: UserInfo }) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Auth must be used within an AuthProvider");
  }

  return auth;
};

export default AuthProvider;
