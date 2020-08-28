import React from "react";
import styled from "styled-components/native";
import UnstyledProfilePicture from "./profilePicture/ProfilePicture";
import ProfileTabs from "./profileTabs/ProfileTabs";

const Wrapper = styled.View`
  height: 100%;
`;

const ProfileInfo = styled.View`
  padding: 20px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: rgb(200, 200, 200);
  border-bottom-width: 1px;
`;

const ProfilePicture = styled(UnstyledProfilePicture)`
  margin: 20px;
`;

const Name = styled.Text`
  font-size: 32px;
  font-weight: 200;
  margin-bottom: 10px;
`;

export type Props = {
  name: string;
  picture: string;
};

export default function Profile({ name, picture }: Props) {
  return (
    <Wrapper>
      <ProfileInfo>
        <ProfilePicture uri={picture} size={125} />
        <Name>{name}</Name>
      </ProfileInfo>
      <ProfileTabs />
    </Wrapper>
  );
}
