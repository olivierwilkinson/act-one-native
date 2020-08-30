import React from "react";
import { TouchableHighlight } from "react-native";
import styled from "styled-components/native";

import { Play } from "../../../types/play-types";
import { titleFont, subFont } from "../../../styles/typography";

import UnstyledPlayListItemActionsContainer from "../playListItemActions/PlayListItemActionsContainer";

const ListItemCard = styled.View`
  margin: 10px 0;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  shadow-offset: 2px;
  background-color: white;
`;

const PlayListItemContent = styled.View`
  display: flex;
  flex-direction: row;
`;

const ImageView = styled.View`
  padding: 10px 5px 10px 20px;
`;

const PlayImage = styled.Image`
  background: grey;
  height: 60px;
  width: 40px;
`;

const PlayInfoView = styled.View`
  display: flex;
  justify-content: center;
  padding-left: 10px;
`;

const TitleText = styled.Text`
  ${titleFont}
`;
const SubText = styled.Text`
  ${subFont}
`;

const PlayListItemActionsContainer = styled(
  UnstyledPlayListItemActionsContainer
)`
  margin: auto;
  margin-right: 5px;
`;

type Props = Play & {
  onPress: () => void;
};

const PlayListItem = ({ onPress, ...play }: Props) => {
  const { title, description, image } = play;
  const source =
    typeof image === "number"
      ? image
      : {
          uri: image
        };

  return (
    <ListItemCard>
      <TouchableHighlight
        testID="play-list-item"
        onPress={onPress}
        underlayColor="white"
      >
        <PlayListItemContent>
          <ImageView>
            <PlayImage source={source} />
          </ImageView>

          <PlayInfoView>
            <TitleText>{title}</TitleText>
            <SubText>{description}</SubText>
          </PlayInfoView>

          <PlayListItemActionsContainer play={play} />
        </PlayListItemContent>
      </TouchableHighlight>
    </ListItemCard>
  );
};

export default PlayListItem;
