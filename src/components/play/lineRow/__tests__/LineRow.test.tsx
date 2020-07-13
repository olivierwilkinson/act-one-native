import "react-native";
import React from "react";
import { render, act } from "react-native-testing-library";

import LineRow from "../LineRow";

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { LineRow as LineRowType } from "../../../../types/play-types";
import wait from "../../../../../test/helpers/wait";
const {
  scenes: [scene]
} = play;
const {
  lineRows: [lineRow, , fifthLineRow]
} = scene.lines[2];

const mount = (lineRow: LineRowType) =>
  render(
    <AppProviders>
      <PlayProviders play={play}>
        <LineRow {...lineRow} italic />
      </PlayProviders>
    </AppProviders>
  );

describe("LineRow", () => {
  it("renders text", async () => {
    const { queryByText } = mount(lineRow);
    await act(wait);

    expect(queryByText(lineRow.text)).not.toBeNull();
  });

  it("does not render number", async () => {
    const { queryByText } = mount(lineRow);
    await act(wait);

    expect(queryByText(lineRow.number!.toString())).toBeNull();
  });

  it("renders number if divisible by 5", async () => {
    const { queryByText } = mount(fifthLineRow);
    await act(wait);

    expect(queryByText("5")).not.toBeNull();
  });
});
