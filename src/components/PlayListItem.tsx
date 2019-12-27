import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import styled from "styled-components";

import { Play } from "../types/play-types";
import { titleFont, subFont } from "../styles/typography.js";

type Props = Play & {
  onClick: () => void;
};

const ListItemCard = styled(View)`
  margin: 10px 0;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-offset: 2px;
  background-color: white;
`;

const PlayListItemContent = styled(View)`
  display: flex;
  flex-direction: row;
`;

const ImageView = styled(View)`
  padding: 10px 5px 10px 20px;
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
  <ListItemCard>
    <TouchableHighlight onPress={props.onClick} underlayColor="white">
      <PlayListItemContent>
        <ImageView>
          <PlayImage source={props.image} alt={props.play} />
        </ImageView>

        <PlayInfoView>
          <TitleText>{props.play}</TitleText>
          <SubText>{props.description}</SubText>
        </PlayInfoView>
      </PlayListItemContent>
    </TouchableHighlight>
  </ListItemCard>
);

export default PlayListItem;
