import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  StatusBar
} from "react-native";
import styled from "styled-components";

import { primaryColour } from "../styles/colours.js";
import { titleFont, bigSizeFont } from "../styles/typography.js";

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

const BackText = styled(Text)`
  ${bigSizeFont}
  color: white;
`;

type Props = {
  title?: string;
  onBack?: () => void;
};

const defaultProps = {
  title: "ActOne"
};

const Header = ({ onBack, title }: Props) => (
  <PrimaryHeader>
    <StatusBar barStyle="light-content" />
    <SideView>
      {onBack && (
        <TouchableHighlight onPress={onBack}>
          <View>
            <BackText>Back</BackText>
          </View>
        </TouchableHighlight>
      )}
    </SideView>

    <TitleView>
      <WhiteTitle>{title}</WhiteTitle>
    </TitleView>

    <SideView />
  </PrimaryHeader>
);

Header.defaultProps = defaultProps;

export default Header;
