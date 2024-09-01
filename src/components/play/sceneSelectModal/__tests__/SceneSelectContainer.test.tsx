import "react-native";
import React from "react";
import { render, waitFor } from "react-native-testing-library";

import SceneSelectModalContainer, { Props } from "../SceneSelectModalContainer";
import { otherScene, scene } from "../../../../../test/graphql/mocks/scene";
import { line, otherLine } from "../../../../../test/graphql/mocks/line";
import AppProviders from "../../../app/appProviders/AppProviders";
import { play } from "../../../../../test/graphql/mocks/play";
import PlayProviders from "../../playProviders/PlayProviders";

const scenes = [
  { ...scene, lines: [{ ...line, lineRows: [] }] },
  { ...otherScene, lines: [{ ...otherLine, lineRows: [] }] }
];

const defaultProps = {
  scenes,
  visible: true,
  onClose: () => {}
};

const mount = (props: Partial<Props> = {}) =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <SceneSelectModalContainer {...defaultProps} {...props} />
      </PlayProviders>
    </AppProviders>
  );

describe("SceneSelect", () => {
  it("renders title", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.getByText("Scene Select")).not.toBeNull()
    );
  });

  it("renders play scene list", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.getByTestId("play-scene-list")).not.toBeNull()
    );
  });
});
