import "react-native";
import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { getAsync, askAsync, AUDIO_RECORDING } from "expo-permissions";

import PlaybackControls from "../PlaybackControls";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { PlaybackMode } from "../../../../contexts/Playback";

import pressByText from "../../../../../test/actions/pressByText";
import pressById from "../../../../../test/actions/pressById";
import SpeechMock from "../../../../../test/mocks/speech";
import { play } from "../../../../../test/graphql/mocks/play";

const getAsyncMock = getAsync as jest.Mock;
const askAsyncMock = askAsync as jest.Mock;

const mount = () => {
  const result = render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <PlaybackControls />
      </PlayProviders>
    </AppProviders>
  );

  return {
    ...result,
    pressPlayButton: () => pressById(result, "play-button"),
    pressRecordButton: () => pressById(result, "record-button"),
    pressPlayHeader: () => pressByText(result, PlaybackMode.Play),
    pressRecordHeader: () => pressByText(result, PlaybackMode.Record)
  };
};

describe("PlaybackControls", () => {
  it("renders play header", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByText(PlaybackMode.Play)).toBeDefined()
    );
  });

  it("renders play button", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("play-button")).toBeDefined()
    );
  });

  it("play button shows play icon when stopped", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("play-icon")).toBeDefined()
    );
  });

  // TODO:- fix pause icon stuff
  it.skip("play button shows pause icon when playing", async () => {
    const screen = mount();

    await screen.pressPlayButton();
    SpeechMock.startSpeaking();

    await waitFor(() =>
      expect(screen.queryByTestId("pause-icon")).not.toBeNull()
    );
  });

  it("play button shows play icon when paused", async () => {
    const screen = mount();

    // start speech
    await screen.pressPlayButton();
    SpeechMock.startSpeaking();

    // pause speech
    await screen.pressPlayButton();

    await waitFor(() =>
      expect(screen.queryByTestId("play-icon")).not.toBeNull()
    );
  });

  // TODO:- fix pause icon stuff
  it.skip("play button shows pause button after resuming", async () => {
    const screen = mount();

    // start speech
    await screen.pressPlayButton();
    SpeechMock.startSpeaking();

    // pause speech
    await screen.pressPlayButton();

    // resume speech
    await screen.pressPlayButton();

    await waitFor(() =>
      expect(screen.queryByTestId("pause-icon")).not.toBeNull()
    );
  });

  it("renders record header", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByText(PlaybackMode.Record)).not.toBeNull()
    );
  });

  it("renders record button", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("record-button")).not.toBeNull()
    );
  });

  it.todo("hides record button");

  it("opens login modal when record header pressed", async () => {
    const screen = mount();
    await screen.pressRecordHeader();

    await waitFor(() =>
      expect(screen.queryByText("Sign in to begin recording")).not.toBeNull()
    );
  });

  describe("when logged in", () => {
    it.skip("asks for permission to record when record header pressed", async () => {
      const screen = mount();
      await screen.pressRecordHeader();

      expect(askAsyncMock).toHaveBeenCalled();
    });

    describe("with permission to record", () => {
      beforeEach(() => {
        getAsyncMock.mockResolvedValue({
          permissions: {
            [AUDIO_RECORDING]: {
              granted: true
            }
          }
        });
      });

      it.todo("enables record mode when record header pressed");
      it.todo("hides play button in record mode");
      it.todo("enables play mode when play header pressed");
    });
  });
});
