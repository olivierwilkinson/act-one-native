import React from "react";
import { TouchableHighlight, StatusBar } from "react-native";
import styled from "styled-components/native";
import { css } from "styled-components";

import { primaryColour } from "../../styles/colours";
import { titleFont, bigSizeFont } from "../../styles/typography";

const PrimaryHeader = styled.SafeAreaView`
  background-color: ${primaryColour};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 0px;
  height: 80px;
`;

const TitleView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideView = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70px;
  margin: 0 14px;
`;

const LeftView = styled.View`
  ${SideView}
  justify-content: flex-start;
`;

const RightView = styled.View`
  ${SideView}
  justify-content: flex-end;
`;

const WhiteTitle = styled.Text`
  ${titleFont}
  ${bigSizeFont}
  color: white;
`;

type HeaderAction = {
  onPress: () => void;
  view: JSX.Element;
};

type Props = {
  title?: string;
  left?: HeaderAction;
  right?: HeaderAction;
};

const defaultProps = {
  title: "ActOne"
};

const Header = ({ title, left, right }: Props) => (
  <PrimaryHeader>
    <StatusBar barStyle="light-content" />
    <LeftView>
      {left && (
        <TouchableHighlight
          onPress={left.onPress}
          underlayColor={primaryColour}
        >
          {left.view}
        </TouchableHighlight>
      )}
    </LeftView>

    <TitleView>
      <WhiteTitle>{title}</WhiteTitle>
    </TitleView>

    <RightView>
      {right && (
        <TouchableHighlight
          onPress={right.onPress}
          underlayColor={primaryColour}
        >
          {right.view}
        </TouchableHighlight>
      )}
    </RightView>
  </PrimaryHeader>
);

Header.defaultProps = defaultProps;

export default Header;
