import React, { useContext, memo } from "react";

import { Line as LineType } from "../../../types/play-types";
import PlayPositionContext from "../../../contexts/PlayPosition";
import PlaybackContext from "../../../contexts/Playback";
import Line from "../line/Line";

const LineContainer = (line: LineType) => {
  const { id, player, lineRows } = line;
  const { activeLine, setActiveLine } = useContext(PlayPositionContext);
  const { stop } = useContext(PlaybackContext);

  return (
    <Line
      id={id}
      lineRows={lineRows}
      highlighted={id === activeLine.id}
      italic={!player}
      onPress={() => {
        stop();
        setActiveLine(line);
      }}
    />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(LineContainer);
