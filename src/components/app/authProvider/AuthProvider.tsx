import React, { useState, ReactNode, createContext, useContext } from "react";

import CardModal from "../../common/cardModal/CardModal";
import Login from "../../../screens/LoginScreen";
import { useQuery } from "@apollo/client";

import GET_USER from "../../../graphql/queries/GetUser.graphql";
import { GetUser } from "../../../graphql/queries/types/GetUser";

type Props = {
  children: ReactNode;
};

export type AuthContextValue = {
  openLoginModal: (message?: string) => void;
  user: GetUser["user"];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const { data: { user = null } = {}, refetch } = useQuery<GetUser>(GET_USER);
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [message, setMessage] = useState<string>();

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          openLoginModal: message => {
            setMessage(message);
            setIsLoginModalActive(true);
          }
        }}
      >
        {children}
      </AuthContext.Provider>

      <CardModal
        title=""
        visible={isLoginModalActive}
        onClose={() => setIsLoginModalActive(false)}
      >
        <Login
          message={message}
          onLogin={() => {
            setIsLoginModalActive(false);
            refetch();
          }}
        />
      </CardModal>
    </>
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
