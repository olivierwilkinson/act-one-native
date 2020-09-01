import React from "react";
import styled from "styled-components/native";

import UnstyledButton from "../../common/button/Button";
import { StyleProp, ViewStyle } from "react-native";

const Actions = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Button = styled(UnstyledButton)`
  margin: 5px;
`;

const ButtonText = styled.Text`
  padding: 5px;
`;

type Props = {
  onCreatePress: () => void;
  onDeletePress: () => void;
  showCreateButton: boolean;
  style: StyleProp<ViewStyle>;
};

const PlayListItemActions = ({
  onCreatePress,
  onDeletePress,
  showCreateButton,
  style
}: Props) => {
  return (
    <Actions style={style}>
      {showCreateButton ? (
        <Button onPress={onCreatePress}>
          <ButtonText>Create</ButtonText>
        </Button>
      ) : (
        <Button onPress={onDeletePress}>
          <ButtonText>Delete</ButtonText>
        </Button>
      )}
    </Actions>
  );
};

export default PlayListItemActions;
