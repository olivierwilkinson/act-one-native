import "react-native";
import React from "react";
import { render, fireEvent, waitFor, act } from "react-native-testing-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LineHeaderContainer, { Props } from "../LineHeaderContainer";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";

import SpeechMock from "../../../../../test/mocks/speech";
import { play } from "../../../../../test/graphql/mocks/play";
import { line } from "../../../../../test/graphql/mocks/line";
import { lineRow } from "../../../../../test/graphql/mocks/lineRow";
import wait from "../../../../../test/helpers/wait";

const defaultProps = {
  ...line,
  lineRows: [lineRow]
};

// TODO:- fix act warnings produced by contexts

const mount = (props: Partial<Props> = {}) =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <LineHeaderContainer {...defaultProps} {...props} />
      </PlayProviders>
    </AppProviders>
  );

describe("LineHeaderContainer", () => {
  afterEach(() => {
    SpeechMock.mockClear();
  });

  it("renders player bubble when line has player", async () => {
    const screen = mount({ player: "test-player" });

    expect(screen.getByTestId("player-bubble")).toBeDefined();
    await act(() => wait(100));
  });

  it("does not render player bubble when line has no player", async () => {
    const screen = mount({ player: undefined });

    expect(screen.queryByTestId("player-bubble")).toBeNull();
    await act(() => wait(100));
  });

  it("does not render profile icon in player bubble when line has different player", async () => {
    const screen = mount({ player: "random-player" });

    expect(screen.queryByTestId("player-user-icon")).toBeNull();
    await act(() => wait(100));
  });

  it("renders profile icon in player bubble when line has selected player", async () => {
    AsyncStorage.setItem(
      `@${play.id}-settings`,
      JSON.stringify({
        selectedPlayer: line.player
      })
    );

    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("player-user-icon")).toBeDefined()
    );
    await act(() => wait(100));
  });

  it("sets active line on press", async () => {
    const screen = mount();

    fireEvent.press(screen.getByTestId("play-line-header"));
    await waitFor(() =>
      expect(screen.getByTestId("play-line-header").props.highlighted).toEqual(
        true
      )
    );
  });

  it("stops audio on press", async () => {
    const screen = mount();

    fireEvent.press(screen.getByTestId("play-line-header"));
    await waitFor(() => expect(SpeechMock.stop).toHaveBeenCalledTimes(1));
    await act(() => wait(100));
  });
});
