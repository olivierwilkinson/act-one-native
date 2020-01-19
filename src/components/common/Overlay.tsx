import React from "react";
import styled from "styled-components/native";

const OverlayView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

type Props = {
  children?: JSX.Element;
};

const Overlay: React.FunctionComponent<Props> = ({ children }) => {
  return <OverlayView pointerEvents="box-none">{children}</OverlayView>;
};

export default Overlay;
