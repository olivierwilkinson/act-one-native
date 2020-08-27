import React from "react";
import styled from "styled-components/native";

import Profile from "../components/profile/profile/ProfileContainer";

const Container = styled.View`
  display: flex;
  align-items: center;
  padding-top: 30px;
`;

export default function ProfileScreen() {
  return (
    <Container>
      <Profile />
    </Container>
  );
}
