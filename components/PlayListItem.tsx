import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import styled from "styled-components";

import Play from "../plays/play";
import { titleFont, subFont } from "../styles/typography.js";

type Props = Play & {
  onClick: () => void;
}

const PlayListItemContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

const ImageView = styled(View)`
  padding: 20px 5px 20px 20px;
`;

const PlayImage = styled(Image)`
  background: grey;
  height: 60px;
  width: 40px;
`;

const PlayInfoView = styled(View)`
  display: flex;
  justify-content: center;
  padding-left: 10px;
`;

const TitleText = styled(Text)`
  ${titleFont}
`;
const SubText = styled(Text)`
  ${subFont}
`;

const PlayListItem = (props: Props) => (
  <TouchableHighlight
    onPress={props.onClick}
    underlayColor="white"
  >
    <PlayListItemContainer>
      <ImageView>
        <PlayImage source={props.image} alt={props.play} />
      </ImageView>

      <PlayInfoView>
        <TitleText>{props.play}</TitleText>
        <SubText>{props.description}</SubText>
      </PlayInfoView>
    </PlayListItemContainer>
  </TouchableHighlight>
);

export default PlayListItem;
