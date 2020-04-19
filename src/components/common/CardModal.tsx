import React, { ReactNode } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";

import { titleFont, bigSizeFont } from "../../styles/typography";
import { lightPrimaryColour, primaryColour } from "../../styles/colours";

const ContentView = styled.View`
  height: 100%;
  width: 100%;
  background: white;
  border-radius: 40px;
  margin-top: 100px;
`;

const TitleView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: ${lightPrimaryColour};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  height: 55px;
`;

const TitleText = styled.Text`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

const HeaderText = styled.Text`
  ${bigSizeFont}
  color: white;
`;

const CloseTouchableHighlight = styled.TouchableHighlight`
  position: absolute;
  right: 14px;
`;

export type Props = {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default ({ visible, title, onClose, children }: Props) => (
  <Modal
    isVisible={visible}
    presentationStyle="overFullScreen"
    swipeDirection="down"
    onSwipeComplete={onClose}
    style={{ margin: 0 }}
  >
    <ContentView testID="play-settings">
      <TitleView>
        <TitleText>{title}</TitleText>

        <CloseTouchableHighlight
          testID="card-modal-close-button"
          onPress={onClose}
          underlayColor={primaryColour}
        >
          <HeaderText>Close</HeaderText>
        </CloseTouchableHighlight>
      </TitleView>

      {children}
    </ContentView>
  </Modal>
);
