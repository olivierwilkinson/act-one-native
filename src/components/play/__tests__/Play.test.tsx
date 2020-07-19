import "react-native";
import React from "react";
import { render, fireEvent, act, waitFor } from "react-native-testing-library";
import Speech from "expo-speech";
import "@react-navigation/native";

import Play from "../Play";
import { getLineText } from "../../../helpers/play";
import AComedyOfErrors from "../../../data/plays/shakespeare/AComedyOfErrors";
import wait from "../../../../test/helpers/wait";
import AppProviders from "../../app/appProviders/AppProviders";
import PlayProviders from "../playProviders/PlayProviders";
import { SpeechMock } from "../../../../test/mocks/speech";
import pressById from "../../../../test/actions/pressById";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock(
  "expo-speech",
  () => jest.requireActual("../../../../test/mocks/speech").default
);
jest.mock("@react-navigation/native", () => {
  const navigation = require("../../../../test/mocks/navigation").default;
  return {
    useNavigation: jest.fn().mockImplementation(() => navigation)
  };
});
jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

const MockedSpeech = (Speech as unknown) as SpeechMock;

// setup play to only have two lines to make testing final line edge cases easier
const play = {
  ...AComedyOfErrors,
  scenes: [
    {
      ...AComedyOfErrors.scenes[0],
      lines: [
        AComedyOfErrors.scenes[0].lines[0],
        AComedyOfErrors.scenes[0].lines[1]
      ]
    }
  ]
};
const {
  scenes: [
    {
      lines: [firstLine, secondLine]
    }
  ]
} = play;

const mount = () => {
  const result = render(
    <AppProviders>
      <PlayProviders play={play}>
        <Play />
      </PlayProviders>
    </AppProviders>
  );

  return {
    ...result,
    pressPlayButton: () => pressById(result, "play-button"),
    pressRecordButton: () => pressById(result, "record-button")
  };
};

describe("Play", () => {
  it("renders play scene header", async () => {
    const { queryByTestId } = mount();
    await wait();

    expect(queryByTestId("play-scene-header")).not.toBeNull();
  });

  it("renders play scene lines", async () => {
    const { getByText } = mount();
    const {
      scenes: [scene]
    } = play;
    const {
      lines: [line]
    } = scene;
    const {
      lineRows: [{ text }]
    } = line;

    await waitFor(() => getByText(text));
  });

  it("renders play scene controls", async () => {
    const { queryByTestId } = mount();
    await wait();

    expect(queryByTestId("playback-controls")).not.toBeNull();
  });

  it("starts speaking when play button pressed", async () => {
    const { pressPlayButton } = mount();
    await wait();

    await pressPlayButton();
    await act(async () => {
      MockedSpeech.startSpeaking();
      await wait();
    });

    const {
      mock: { calls }
    } = MockedSpeech.speak;
    expect(calls.length).toEqual(1);

    const [args] = calls;
    expect(args.length).toEqual(2);

    const [text] = args;
    expect(text).toEqual(getLineText(firstLine));
  });

  it("can pause speech", async () => {
    const { pressPlayButton } = mount();
    await wait();

    // start speech
    await pressPlayButton();
    await act(async () => {
      MockedSpeech.startSpeaking();
      await wait();
    });

    // pause speech
    await pressPlayButton();

    expect(MockedSpeech.pause).toHaveBeenCalledTimes(1);
  });

  it("can resume speech", async () => {
    const { pressPlayButton } = mount();
    await wait();

    // start speech
    await pressPlayButton();
    await act(async () => {
      MockedSpeech.startSpeaking();
      await wait();
    });

    // pause speech
    await pressPlayButton();

    // resume speech
    await pressPlayButton();

    expect(MockedSpeech.resume).toHaveBeenCalledTimes(1);
  });

  it("stops speaking when new line is selected", async () => {
    const { getByTestId } = mount();

    await act(async () => {
      await wait();

      fireEvent.press(getByTestId("play-button"));
      MockedSpeech.startSpeaking();
      await wait();

      MockedSpeech.mockClear();
      fireEvent.press(getByTestId(`play-line-view-${secondLine.id}`));
      await wait();
    });

    expect(MockedSpeech.stop).toHaveBeenCalledTimes(1);
  });

  it("selects next line when speaking finishes", async () => {
    const { getByTestId } = mount();

    await act(async () => {
      await wait();

      fireEvent.press(getByTestId("play-button"));
      MockedSpeech.startSpeaking();
      await wait();

      MockedSpeech.finishSpeaking();
      await wait();
    });

    const originalLine = getByTestId(`play-line-view-${firstLine.id}`);
    const nextLine = getByTestId(`play-line-view-${secondLine.id}`);

    expect(originalLine.props.highlighted).toEqual(false);
    expect(nextLine.props.highlighted).toEqual(true);
  });

  it("speaks next line when speaking finishes", async () => {
    const { getByTestId } = mount();

    await act(async () => {
      await wait();

      fireEvent.press(getByTestId("play-button"));
      MockedSpeech.startSpeaking();
      await wait();

      MockedSpeech.mockClear();
      MockedSpeech.finishSpeaking();
      await wait();
    });

    const {
      mock: { calls }
    } = MockedSpeech.speak;
    expect(calls.length).toEqual(1);

    const args = calls[0];
    expect(args.length).toEqual(2);

    const [text, { onDone, voice }] = args;
    expect(text).toEqual(getLineText(secondLine));
    expect(onDone).toBeTruthy();
    expect(voice).toEqual("com.apple.ttsbundle.Daniel-compact");
  });
});
