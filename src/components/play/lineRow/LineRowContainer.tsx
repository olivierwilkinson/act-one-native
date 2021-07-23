import React, { memo } from "react";
import { useQuery } from "@apollo/client";

import LineRow from "./LineRow";
import GET_LINE_ROW from "./GetLineRow.graphql";
import { GetLineRow, GetLineRowVariables } from "./types/GetLineRow";
import Placeholder from "../../common/placeholder/Placeholder";

export type Props = {
  id: number;
  italic: boolean;
};

const LineRowContainer = ({ id, italic }: Props) => {
  const { data: { lineRow } = {}, loading } = useQuery<
    GetLineRow,
    GetLineRowVariables
  >(GET_LINE_ROW, { variables: { where: { id } } });

  if (!lineRow) {
    return <Placeholder loading={loading} />;
  }

  return (
    <LineRow number={lineRow.number} text={lineRow.text} italic={italic} />
  );
};

// don't rerender on prop changes to optimise lists
export default memo(LineRowContainer);
