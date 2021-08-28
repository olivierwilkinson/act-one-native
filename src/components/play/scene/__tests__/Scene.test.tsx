import "react-native";
import React from "react";
import { render } from "react-native-testing-library";

import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { play } from "../../../../../test/graphql/mocks/play";
import { lineRow } from "../../../../../test/graphql/mocks/lineRow";
import SceneContainer from "../SceneContainer";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <SceneContainer />
      </PlayProviders>
    </AppProviders>
  );

describe("Scene", () => {
  it("renders play scene lines", async () => {
    const { findByText } = mount();
    await findByText(lineRow.text);
  });
});
