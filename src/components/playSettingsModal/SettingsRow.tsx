import React from "react";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import {
  smallSizeFont,
  mediumSizeFont,
  subFont
} from "../../styles/typography";
import { lightGray, darkGray } from "../../styles/colours";

const SettingLeftIcon = styled(Ionicons)`
  margin: 0 20px;
`;

const SettingView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
  background: white;
  height: 70px;
  width: 100%;
`;

const SettingContentView = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-right: 10px;

  border-bottom-width: 1px;
  border-bottom-color: ${lightGray};
`;

const SettingRightView = styled.View`
  flex: 3;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-left: auto;
`;

const SettingRightArrow = styled(Ionicons)`
  margin-left: 10px;
`;

const LabelText = styled.Text`
  ${mediumSizeFont}
  color: ${darkGray};
`;

const ValueText = styled.Text`
  ${subFont}
  ${smallSizeFont}
  color: gray;
`;

export type Props = {
  label: string;
  onPress?: () => void;
  value?: string;
  leftIconName?: string;
};

export default ({ label, onPress, leftIconName, value }: Props) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <SettingView>
        {leftIconName && (
          <SettingLeftIcon
            testID="settings-row-left-icon"
            size={24}
            name={leftIconName}
          />
        )}

        <SettingContentView>
          <LabelText>{label}</LabelText>

          <SettingRightView>
            {!!value && <ValueText numberOfLines={1}>{value}</ValueText>}

            {onPress && (
              <SettingRightArrow
                testID="settings-row-right-arrow"
                size={20}
                name="ios-arrow-forward"
                color="gray"
              />
            )}
          </SettingRightView>
        </SettingContentView>
      </SettingView>
    </TouchableHighlight>
  );
};
