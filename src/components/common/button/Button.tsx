import React, { useState, ReactNode } from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

const getButtonBackground = ({
  depressed,
  disabled,
  depressedColor,
  disabledColor,
  color
}: {
  depressed: boolean;
  disabled: boolean;
  depressedColor: string;
  disabledColor: string;
  color: string;
}) => {
  if (disabled) return disabledColor;
  if (depressed) return depressedColor;
  return color;
};

const Touchable = styled.TouchableOpacity`
  height: 40px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${getButtonBackground};
  box-shadow: 1px 1px 1px grey;
  background-color: ${getButtonBackground};
`;

const ButtonContent = styled.View`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export type Props = TouchableOpacityProps & {
  children: ReactNode;
  depressedColor?: string;
  disabledColor?: string;
  color?: string;
};

export default function Button({
  children,
  depressedColor = "#eee",
  disabledColor = "rgba(0,0,0,0.08)",
  color = "#fff",
  ...touchableProps
}: Props) {
  const [depressed, setDepressed] = useState(false);
  const {
    onPressIn = () => {},
    onPressOut = () => {},
    disabled
  } = touchableProps;

  return (
    <Touchable
      activeOpacity={1}
      {...touchableProps}
      color={color}
      disabledColor={disabledColor}
      depressedColor={depressedColor}
      disabled={!!disabled}
      depressed={depressed}
      onPressIn={e => {
        setDepressed(true);
        onPressIn(e);
      }}
      onPressOut={e => {
        setDepressed(false);
        onPressOut(e);
      }}
    >
      <ButtonContent>{children}</ButtonContent>
    </Touchable>
  );
}
