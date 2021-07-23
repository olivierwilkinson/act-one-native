import React, { useContext, memo } from "react";
import { useQuery } from "@apollo/client";

import { usePlayPosition } from "../../../contexts/PlayPosition";
import PlaybackContext from "../../../contexts/Playback";
import Line from "../line/Line";
import GET_LINE from "./GetLine.graphql";
import { GetLine, GetLineVariables } from "./types/GetLine";
import Placeholder from "../../common/placeholder/Placeholder";
import { useMemo } from "react";

export type Props = {
  id: number;
};

const LineContainer = ({ id }: Props) => {
  const { activeLineId, setActiveLineId } = usePlayPosition();
  const { stop } = useContext(PlaybackContext);

  const { data: { line } = {}, loading } = useQuery<GetLine, GetLineVariables>(
    GET_LINE,
    { variables: { where: { id } } }
  );

  const lineRowIds = useMemo(
    () =>
      [...(line?.lineRows || [])]
        .sort((a, b) => a.index - b.index)
        .map((lineRow) => lineRow.id),
    [line?.lineRows]
  );

  if (!line || !lineRowIds) {
    return <Placeholder loading={loading} />;
  }

  return (
    <Line
      id={id}
      lineRowIds={lineRowIds}
      highlighted={id === activeLineId}
      italic={!line.player}
      onPress={() => {
        stop();
        setActiveLineId(id);
      }}
    />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(LineContainer);
