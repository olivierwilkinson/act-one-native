import React, { useState } from "react";
import { Modal, Animated } from "react-native";
import styled from "styled-components/native";
import { css } from "styled-components";

const ModalContentView = styled.SafeAreaView`
  margin-top: auto;
  padding: 8px;
  padding-bottom: 0;
`;

const CustomContentContainerView = styled.View`
  margin: 10px;
  margin-bottom: 0;
  border-width: 1px;
  border-color: white;
  border-radius: 10px;
  background-color: white;
`;

const TouchableModalBackground = styled.TouchableHighlight`
  width: 100%;
  height: 100%;
`;

const FadeInView = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: black;
`;

const TouchableAction = styled.TouchableHighlight`
  margin: 10px;
  margin-bottom: 0;
  background: white;
  height: 40px;
  background-color: white;
  border-color: white;
  border-width: 1px;
  border-radius: 10px;
  justify-content: center;
`;

const ActionSheetText = css`
  align-self: center;
  font-size: 18px;
`;

const DoneText = styled.Text`
  ${ActionSheetText}
`;

const CancelText = styled.Text`
  ${ActionSheetText}
  color: #0069d5;
`;

export type Props = {
  visible: boolean;
  children: JSX.Element;
  onCancel: () => void;
  onDone?: () => void;
};

export default ({ visible, children, onDone, onCancel }: Props) => {
  const [opacity] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 0.2 : 0,
      duration: 300
    }).start();
  }, [visible]);

  return (
      <FadeInView pointerEvents="box-none" style={{ opacity }}>
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={onCancel}
          transparent
        >
          <TouchableModalBackground
            testID="custom-action-sheet-background"
            underlayColor="transparent"
            onPress={onCancel}
          >
            <ModalContentView>
              <CustomContentContainerView>
                {children}
              </CustomContentContainerView>

              {onDone && (
                <TouchableAction
                  testID="custom-action-sheet-done-button"
                  onPress={onDone}
                >
                  <DoneText>Done</DoneText>
                </TouchableAction>
              )}

              <TouchableAction onPress={onCancel}>
                <CancelText>Cancel</CancelText>
              </TouchableAction>
            </ModalContentView>
          </TouchableModalBackground>
        </Modal>
      </FadeInView>
  );
};
