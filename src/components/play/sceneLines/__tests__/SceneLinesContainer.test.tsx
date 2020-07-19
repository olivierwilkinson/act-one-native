import "react-native";
import React from "react";
import { render, waitFor } from "react-native-testing-library";

import SceneLinesContainer from "../SceneLinesContainer";

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import { Line } from "../../../../types/play-types";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
const {
  scenes: [scene]
} = play;
const line = scene.lines.find(({ player }) => player) as Line;
const {
  lineRows: [lineRow]
} = line;

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders play={play}>
        <SceneLinesContainer />
      </PlayProviders>
    </AppProviders>
  );

describe("SceneLinesContainer", () => {
  it("renders line", async () => {
    const { getByText } = mount();

    await waitFor(() => getByText(lineRow.text));
  });

  it("renders line header", async () => {
    const { findAllByText } = mount();

    const headers = await findAllByText(line.player);
    expect(headers.length).toBeTruthy();
  });
});
