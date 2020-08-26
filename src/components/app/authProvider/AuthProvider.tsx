import React, { useState, ReactNode, createContext, useContext } from "react";

type Props = {
  children: ReactNode;
};

export type UserInfo = {
  displayName: string;
  email: string;
  googleId: string;
  id: number;
  name: string;
  picture: string;
};

export type AuthContextValue = {
  user?: UserInfo;
  setUser: (user: UserInfo) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserInfo>();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
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
