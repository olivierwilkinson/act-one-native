import React from "react";
import { useQuery } from "@apollo/client";

import Login from "./Login";
import GET_USER from "../../../graphql/queries/GetUser.graphql";
import { GetUser } from "../../../graphql/queries/types/GetUser";

export type Props = {
  message?: string;
  onLogin?: () => void;
};

export default ({ message, onLogin = () => {} }: Props) => {
  const { refetch, loading } = useQuery<GetUser>(GET_USER);

  return (
    <Login
      message={message}
      disabled={loading}
      onLogin={async () => {
        await refetch();
        onLogin();
      }}
    />
  );
};
