import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  StatusBar
} from "react-native";
import styled from "styled-components";

import { primaryColour } from "../../styles/colours";
import { titleFont, bigSizeFont } from "../../styles/typography";

const PrimaryHeader = styled(SafeAreaView)`
  background-color: ${primaryColour};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0px;
  height: 80px;
`;

const TitleView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
`;

const WhiteTitle = styled(Text)`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

const ActionText = styled(Text)`
  ${bigSizeFont}
  color: white;
`;

type Props = {
  title?: string;
  onBack?: () => void;
  onCancel?: () => void;
};

const defaultProps = {
  title: "ActOne"
};

const Header = ({ title, onBack, onCancel }: Props) => (
  <PrimaryHeader>
    <StatusBar barStyle="light-content" />
    <SideView>
      {onBack && (
        <TouchableHighlight onPress={onBack}>
          <View>
            <ActionText>Back</ActionText>
          </View>
        </TouchableHighlight>
      )}
    </SideView>

    <TitleView>
      <WhiteTitle>{title}</WhiteTitle>
    </TitleView>

    <SideView>
      {onCancel && (
        <TouchableHighlight onPress={onCancel}>
          <View>
            <ActionText>Cancel</ActionText>
          </View>
        </TouchableHighlight>
      )}
    </SideView>
  </PrimaryHeader>
);

Header.defaultProps = defaultProps;

export default Header;
