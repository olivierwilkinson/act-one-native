import React from "react";
import { useAuth } from "../../../contexts/Auth";
import CardModal from "../../common/cardModal/CardModal";
import LoginContainer from "../../app/login/LoginContainer";

export default function LoginModal() {
  const auth = useAuth();

  return (
    <CardModal
      title=""
      visible={auth.isLoginModalActive}
      onClose={auth.closeLoginModal}
    >
      <LoginContainer message={auth.message} onLogin={auth.closeLoginModal} />
    </CardModal>
  );
}
