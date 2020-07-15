import React, { useContext, memo } from "react";

import { RGBColour } from "../../../types/colour-types";
import { Line } from "../../../types/play-types";
import PlayPositionContext from "../../../contexts/PlayPosition";
import PlaybackContext from "../../../contexts/Playback";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import LineHeader from "./LineHeader";

type Props = Line & {
  colour: RGBColour;
};

const LineHeaderContainer = ({ colour, ...line }: Props) => {
  const { activeLine, setActiveLine } = useContext(PlayPositionContext);
  const {
    settings: { selectedPlayer }
  } = useContext(PlaySettingsContext);
  const { stop } = useContext(PlaybackContext);
  const { player, id } = line;
  const isCurrentLine = activeLine.id === id;

  return (
    <LineHeader
      onPress={() => {
        stop();
        setActiveLine(line);
      }}
      highlighted={isCurrentLine}
      player={player}
      colour={colour}
      isSelected={selectedPlayer === player}
    />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(LineHeaderContainer);
