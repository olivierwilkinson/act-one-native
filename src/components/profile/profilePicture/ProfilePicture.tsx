import React from "react";
import styled, { css } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { primaryColour } from "../../../styles/colours";

const resizeableCircle = css`
  height: ${({ size }: { size: number }) => `${size}px`}
  width: ${({ size }: { size: number }) => `${size}px`}
  border-radius: ${({ size }: { size: number }) => `${size / 2}px`}
`;

const ImageContainer = styled.View`
  background-color: ${primaryColour};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ size }: { size: number }) => `${size}px`};
`;

const ProfileImage = styled.Image`
  ${resizeableCircle}
`;

export type Props = {
  uri?: string;
  size?: number;
};

export default function ProfilePicture({ uri, size = 50 }: Props) {
  return (
    <ImageContainer size={size}>
      {uri ? (
        <ProfileImage size={size} source={{ uri }} />
      ) : (
        <MaterialCommunityIcons name="face-profile" size={size} color="white" />
      )}
    </ImageContainer>
  );
}
