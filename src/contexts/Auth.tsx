import React, { useState, ReactNode, createContext, useContext } from "react";
import { useQuery } from "@apollo/client";

import GET_USER from "../graphql/queries/GetUser.graphql";
import { GetUser } from "../graphql/queries/types/GetUser";

type Props = {
  children: ReactNode;
};

export type AuthContextValue = {
  message?: string;
  isLoginModalActive: boolean;
  closeLoginModal: () => void;
  openLoginModal: (message?: string) => void;
  user: GetUser["user"];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const { data: { user = null } = {} } = useQuery<GetUser>(GET_USER);
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [message, setMessage] = useState<string>();

  return (
    <AuthContext.Provider
      value={{
        user,
        message,
        isLoginModalActive,
        closeLoginModal: () => setIsLoginModalActive(false),
        openLoginModal: message => {
          setMessage(message);
          setIsLoginModalActive(true);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};
