import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import Scene from "../Scene";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

import { SectionList } from "react-native";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { play } from "../../../../../test/graphql/mocks/play";
import {
  lineRow,
  otherLineRow
} from "../../../../../test/graphql/mocks/lineRow";
import { graphql, server } from "../../../../../test/msw/server";
import {
  GetPlay,
  GetPlayVariables
} from "../../../../graphql/queries/types/GetPlay";
import createGetPlay from "../../../../../test/graphql/factories/createGetPlay";
import {
  actTwoScene,
  otherScene,
  scene
} from "../../../../../test/graphql/mocks/scene";
import { line, otherLine } from "../../../../../test/graphql/mocks/line";

const mount = async () =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <Scene />
      </PlayProviders>
    </AppProviders>
  );

describe("Scene", () => {
  beforeEach(() => {
    server.use(
      graphql.query<GetPlay, GetPlayVariables>("GetPlay", (req, res, ctx) =>
        res(
          ctx.data(
            createGetPlay(req.variables, [
              { ...scene, lines: [{ ...line, lineRows: [lineRow] }] },
              {
                ...otherScene,
                lines: [{ ...otherLine, lineRows: [otherLineRow] }]
              },
              { ...actTwoScene, lines: [] }
            ])
          )
        )
      )
    );
  });
  it("renders play scene header", async () => {
    const { findByText } = await mount();
    await findByText("ACT 1 - SCENE 1");
  });

  it("renders play scene lines", async () => {
    const { findByText } = await mount();
    await findByText(lineRow.text);
  });

  it("renders playback controls", async () => {
    const { findByTestId } = await mount();
    await findByTestId("playback-controls");
  });

  it("scrolls lines to the top when scene changes", async () => {
    const screen = await mount();

    const scrollToLocationMock = jest.fn();
    const [sceneLines] = await waitFor(() =>
      screen.UNSAFE_getAllByType(SectionList)
    );
    sceneLines.instance.scrollToLocation = scrollToLocationMock;
    const nextSceneButton = await screen.findByTestId("next-scene-button");
    fireEvent.press(nextSceneButton);

    await screen.findByText("ACT 1 - SCENE 2");

    expect(scrollToLocationMock).toHaveBeenCalledWith({
      animated: false,
      sectionIndex: 0,
      itemIndex: 0
    });
  });

  it("scrolls lines to the top when act changes", async () => {
    const screen = await mount();

    const scrollToLocationMock = jest.fn();
    const [sceneLines] = await waitFor(() =>
      screen.UNSAFE_getAllByType(SectionList)
    );
    sceneLines.instance.scrollToLocation = scrollToLocationMock;

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await screen.findByText("ACT 1 - SCENE 2");

    scrollToLocationMock.mockRestore();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await screen.findByText("ACT 2 - SCENE 1");

    expect(scrollToLocationMock).toHaveBeenCalledWith({
      animated: false,
      sectionIndex: 0,
      itemIndex: 0
    });
  });
});
