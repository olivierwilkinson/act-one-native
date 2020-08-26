import React, { useState, ReactNode, createContext, useContext } from "react";

import CardModal from "../../common/cardModal/CardModal";
import Login from "../../../screens/LoginScreen";

type Props = {
  children: ReactNode;
};

export type AuthContextValue = {
  openLoginModal: (message?: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [message, setMessage] = useState<string>();

  return (
    <>
      <AuthContext.Provider
        value={{
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
        <Login message={message} />
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
