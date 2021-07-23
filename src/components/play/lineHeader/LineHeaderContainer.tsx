import React, { useContext, memo } from "react";
import { useQuery } from "@apollo/client";

import { usePlayPosition } from "../../../contexts/PlayPosition";
import PlaybackContext from "../../../contexts/Playback";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import LineHeader from "./LineHeader";
import GET_LINE_HEADER from "./GetLineHeader.graphql";
import { GetLineHeader, GetLineHeaderVariables } from "./types/GetLineHeader";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = {
  id: number;
};

const LineHeaderContainer = ({ id }: Props) => {
  const { activeLineId, setActiveLineId } = usePlayPosition();
  const { settings: { selectedPlayer = "" } = {} } = useContext(
    PlaySettingsContext
  );
  const { stop } = useContext(PlaybackContext);
  const isCurrentLine = activeLineId === id;

  const { data: { line } = {}, loading } = useQuery<
    GetLineHeader,
    GetLineHeaderVariables
  >(GET_LINE_HEADER, { variables: { where: { id } } });

  if (!line) {
    return <Placeholder loading={loading} />;
  }

  return (
    <LineHeader
      onPress={() => {
        stop();
        setActiveLineId(id);
      }}
      highlighted={isCurrentLine}
      player={line.player}
      // colour={colourByPlayer[player]}
      isSelected={selectedPlayer === line.player}
    />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(LineHeaderContainer);
