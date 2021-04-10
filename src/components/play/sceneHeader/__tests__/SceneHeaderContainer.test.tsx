import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import SceneHeaderContainer from "../SceneHeaderContainer";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { play } from "../../../../../test/graphql/mocks/play";
import { graphql, server } from "../../../../../test/msw/server";
import {
  GetPlay,
  GetPlayVariables
} from "../../../../graphql/queries/types/GetPlay";
import createGetPlay from "../../../../../test/graphql/factories/createGetPlay";
import { otherScene, scene } from "../../../../../test/graphql/mocks/scene";

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <SceneHeaderContainer />
      </PlayProviders>
    </AppProviders>
  );

describe("SceneHeaderContainer", () => {
  beforeEach(() => {
    server.use(
      graphql.query<GetPlay, GetPlayVariables>("GetPlay", (req, res, ctx) =>
        res(
          ctx.data(
            createGetPlay(req.variables, [
              { ...scene, lines: [] },
              { ...otherScene, lines: [] }
            ])
          )
        )
      )
    );
  });

  it("renders act and scene title", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 1")).toBeDefined()
    );
  });

  it("opens scene select when scene select button pressed", async () => {
    const screen = mount();

    const sceneSelectButton = await screen.findByTestId("scene-select-button");
    fireEvent.press(sceneSelectButton);

    await waitFor(() => expect(screen.getByText("Scene Select")).toBeDefined());
  });

  it("does not render previous scene button", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 1")).toBeDefined()
    );

    expect(screen.queryByTestId("previous-scene-button")).toBeNull();
  });

  it("can go to next scene", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 2")).toBeDefined()
    );
  });

  it("can go to previous scene when in second scene", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 2")).toBeDefined()
    );

    fireEvent.press(await screen.findByTestId("previous-scene-button"));
    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 1")).toBeDefined()
    );
  });

  it("does not render next scene button when in final scene", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 2")).toBeDefined()
    );

    expect(screen.queryByTestId("next-scene-button")).toBeNull();
  });
});
