import "react-native";
import React from "react";
import { render, act } from "react-native-testing-library";
import { getAsync, askAsync, AUDIO_RECORDING } from "expo-permissions";
import Speech from "expo-speech";

import PlaybackControls from "../PlaybackControls";
import AppProviders from "../../app/appProviders/AppProviders";
import PlayProviders from "../playProviders/PlayProviders";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import wait from "../../../../test/helpers/wait";
import SpeechMock from "../../../../test/mocks/speech";
import { PlaybackMode } from "../../../contexts/Playback";
import pressByText from "../../../../test/actions/pressByText";
import pressById from "../../../../test/actions/pressById";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

jest.mock(
  "expo-speech",
  () => jest.requireActual("../../../../test/mocks/speech").default
);

jest.mock("expo-permissions", () => ({
  ...jest.requireActual("expo-permissions"),
  getAsync: jest.fn().mockResolvedValue({ permissions: {} }),
  askAsync: jest.fn().mockResolvedValue({ permissions: {} })
}));

const MockedSpeech = (Speech as unknown) as typeof SpeechMock;
const getAsyncMock = getAsync as jest.Mock;
const askAsyncMock = askAsync as jest.Mock;

const mount = () => {
  const result = render(
    <AppProviders>
      <PlayProviders play={play}>
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
  beforeEach(async () => {
    await act(wait);
  });

  it("renders play header", async () => {
    const { queryByText } = mount();
    await act(wait);

    expect(queryByText(PlaybackMode.Play)).not.toBeNull();
  });

  it("renders play button", async () => {
    const { queryByTestId } = mount();
    await act(wait);

    expect(queryByTestId("play-button")).not.toBeNull();
  });

  it("play button shows play icon when stopped", async () => {
    const { queryByTestId } = mount();
    await act(wait);

    expect(queryByTestId("play-icon")).not.toBeNull();
  });

  it("play button shows pause icon when playing", async () => {
    const { pressPlayButton, queryByTestId } = mount();
    await act(wait);

    await pressPlayButton();
    act(MockedSpeech.startSpeaking);

    expect(queryByTestId("pause-icon")).not.toBeNull();
  });

  it("play button shows play icon when paused", async () => {
    const { pressPlayButton, queryByTestId } = mount();
    await act(wait);

    // start speech
    await pressPlayButton();
    act(MockedSpeech.startSpeaking);

    // pause speech
    await pressPlayButton();

    expect(queryByTestId("play-icon")).not.toBeNull();
  });

  it("play button shows pause button after resuming", async () => {
    const { pressPlayButton, queryByTestId } = mount();
    await act(wait);

    // start speech
    await pressPlayButton();
    act(MockedSpeech.startSpeaking);

    // pause speech
    await pressPlayButton();

    // resume speech
    await pressPlayButton();

    expect(queryByTestId("pause-icon")).not.toBeNull();
  });

  it("renders record header", async () => {
    const { queryByText } = mount();
    await act(wait);

    expect(queryByText(PlaybackMode.Record)).not.toBeNull();
  });

  it("renders record button", async () => {
    const { queryByTestId } = mount();
    await act(wait);

    expect(queryByTestId("record-button")).not.toBeNull();
  });

  it.todo("hides record button");

  it("asks for permission to record when record header pressed", async () => {
    const { pressRecordHeader } = mount();
    await act(wait);
    await pressRecordHeader();

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
