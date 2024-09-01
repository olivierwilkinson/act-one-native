import React from "react";
import styled from "styled-components/native";
import Button from "../button/Button";
import { buttonFont } from "../../../styles/typography";
import { lightPrimaryColour, primaryColour } from "../../../styles/colours";

const StyledButton = styled(Button)`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const ButtonText = styled.Text`
  ${buttonFont}
  font-family: "Roboto_500Medium";
  margin: auto;
  color: white;
  opacity: 1;
`;

export default function SubmitButton({
  children,
  depressedColor = "gray",
  disabledColor = lightPrimaryColour,
  color = primaryColour,
  ...touchableProps
}: React.ComponentProps<typeof Button>) {
  return (
    <StyledButton
      color={color}
      depressedColor={depressedColor}
      disabledColor={disabledColor}
      {...touchableProps}
    >
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
}
