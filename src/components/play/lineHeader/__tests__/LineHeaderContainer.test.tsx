import "react-native";
import React from "react";
import { render, fireEvent, act } from "react-native-testing-library";
import Speech from "expo-speech";

import LineHeaderContainer from "../LineHeaderContainer";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import { Line } from "../../../../types/play-types";
import wait from "../../../../../test/helpers/wait";

import { SpeechMock } from "../../../../../test/mocks/speech";
import AsyncStorage from "@react-native-community/async-storage";

jest.mock("@react-native-community/async-storage", () => {
  const MockAsyncStorage = require("mock-async-storage").default;
  return new MockAsyncStorage();
});

jest.mock(
  "expo-speech",
  () => jest.requireActual("../../../../../test/mocks/speech").default
);

const MockedSpeech = (Speech as unknown) as SpeechMock;

const {
  scenes: [scene]
} = play;
const { colourByPlayer } = play;

const [, inactiveLine] = scene.lines;
const playerLine = scene.lines.find(({ player }) => player) as Line;
const noPlayerLine = scene.lines.find(({ player }) => !player) as Line;
const otherPlayerLine = scene.lines.find(
  ({ player, id }) => id !== playerLine.id && player
) as Line;

const mount = (l: Line) =>
  render(
    <AppProviders>
      <PlayProviders play={play}>
        <LineHeaderContainer {...l} colour={colourByPlayer[l.player]} />
      </PlayProviders>
    </AppProviders>
  );

describe("LineHeaderContainer", () => {
  it("sets active line on press", async () => {
    const { getByTestId } = mount(inactiveLine);
    await act(wait);

    fireEvent.press(getByTestId("play-line-header"));
    await act(wait);

    expect(getByTestId("play-line-header").props.highlighted).toEqual(true);
  });

  it("stops audio on press", async () => {
    const { getByTestId } = mount(inactiveLine);
    await act(wait);

    MockedSpeech.mockClear();
    fireEvent.press(getByTestId("play-line-header"));
    await act(wait);

    expect(MockedSpeech.stop).toHaveBeenCalledTimes(1);
  });

  it("renders player bubble when line has player", async () => {
    const { queryByTestId } = mount(playerLine);
    await act(wait);

    expect(queryByTestId("player-bubble")).not.toBeNull();
  });

  it("does not render player bubble when line has no player", async () => {
    const { queryByTestId } = mount(noPlayerLine);
    await act(wait);

    expect(queryByTestId("player-bubble")).toBeNull();
  });

  describe("when user has selected player", () => {
    beforeEach(() => {
      AsyncStorage.setItem(
        `@${play.play}-settings`,
        JSON.stringify({
          selectedPlayer: playerLine.player
        })
      );
    });

    it("renders profile icon in player bubble when line has selected player", async () => {
      const { queryByTestId } = mount(playerLine);
      await act(wait);

      expect(queryByTestId("player-user-icon")).not.toBeNull();
    });

    it("does not render profile icon in player bubble when line has different player", async () => {
      const { queryByTestId } = mount(otherPlayerLine);
      await act(wait);

      expect(queryByTestId("player-user-icon")).toBeNull();
    });
  });
});
