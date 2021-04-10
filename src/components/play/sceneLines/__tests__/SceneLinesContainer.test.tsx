import "react-native";
import React from "react";
import { render, waitFor } from "react-native-testing-library";

import SceneLinesContainer from "../SceneLinesContainer";

import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { play } from "../../../../../test/graphql/mocks/play";
import { lineRow } from "../../../../../test/graphql/mocks/lineRow";
import { line } from "../../../../../test/graphql/mocks/line";

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
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
