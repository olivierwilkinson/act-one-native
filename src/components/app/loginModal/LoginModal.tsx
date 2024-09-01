import React from "react";
import { useAuth } from "../../../contexts/Auth";
import CardModal from "../../common/cardModal/CardModal";
import Login from "../../common/login/Login";

export default function LoginModal() {
  const auth = useAuth();

  return (
    <CardModal
      title=""
      visible={auth.isLoginModalActive}
      onClose={auth.closeLoginModal}
    >
      <Login message={auth.message} onLogin={auth.closeLoginModal} />
    </CardModal>
  );
}
