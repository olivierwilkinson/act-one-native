import "react-native";
import React from "react";
import {
  render,
  cleanup,
  GetByAPI,
  fireEvent,
  QueryByAPI,
  act
} from "react-native-testing-library";
import { speak, pause, resume, stop } from "expo-speech";
import "@react-navigation/native";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  stop: jest.fn()
}));
jest.mock("@react-navigation/native", () => {
  const navigation = require("../../../../test/mocks/navigation").default;
  return {
    useNavigation: jest.fn().mockImplementation(() => navigation)
  };
});
jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

import Play from "../Play";
import { getLineText } from "../../../helpers/play";
import AComedyOfErrors from "../../../data/plays/shakespeare/AComedyOfErrors";
import PlayPositionProvider from "../PlayPositionProvider";
import PlayNavigationProvider from "../PlayNavigationProvider";
import AudioProvider from "../AudioProvider";
import PlaySettingsContext, {
  PlaySettingsContextValue
} from "../../../contexts/PlaySettings";
import PlaybackModeProvider from "../PlaybackModeProvider";

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

const mockedSpeak = speak as jest.Mock;
const mockedPause = pause as jest.Mock;
const mockedResume = resume as jest.Mock;
const mockedStop = stop as jest.Mock;

describe("Play", () => {
  let queryByTestId: QueryByAPI["queryByTestId"];
  let getByTestId: GetByAPI["getByTestId"];
  let getByText: GetByAPI["getByText"];
  let settingsContext: PlaySettingsContextValue;
  let openSceneSelect: jest.Mock;

  beforeEach(async () => {
    settingsContext = {
      settings: { act: 1, scene: 1 },
      setSettings: jest.fn()
    };
    openSceneSelect = jest.fn();

    ({ queryByTestId, getByTestId, getByText } = render(
      <PlaySettingsContext.Provider value={settingsContext}>
        <PlayPositionProvider play={play}>
          <PlayNavigationProvider play={play}>
            <AudioProvider>
              <PlaybackModeProvider>
                <Play play={play} openSceneSelect={openSceneSelect} />
              </PlaybackModeProvider>
            </AudioProvider>
          </PlayNavigationProvider>
        </PlayPositionProvider>
      </PlaySettingsContext.Provider>
    ));
  });
  afterEach(() => {
    cleanup();

    mockedSpeak.mockRestore();
    mockedPause.mockRestore();
    mockedResume.mockRestore();
    mockedStop.mockRestore();
  });

  it("renders play scene header", () => {
    expect(queryByTestId("play-scene-header")).not.toBeNull();
  });

  it("renders play scene lines", () => {
    expect(queryByTestId("play-scene-lines")).not.toBeNull();
  });

  it("renders play scene controls", () => {
    expect(queryByTestId("playback-controls")).not.toBeNull();
  });

  it("starts speaking when play/pause button pressed", async () => {
    const playPauseButton = getByTestId("play-action");
    fireEvent.press(playPauseButton);

    const {
      mock: { calls }
    } = mockedSpeak;
    expect(calls.length).toEqual(1);

    const [args] = calls;
    expect(args.length).toEqual(2);

    const [text, { onDone, voice }] = args;
    expect(text).toEqual(getLineText(firstLine));
    expect(onDone).toBeTruthy();
    expect(voice).toEqual("com.apple.ttsbundle.Daniel-compact");
  });

  describe("when speaking", () => {
    beforeEach(() => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);
    });

    it("pauses speaking when play/pause button pressed", async () => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);

      expect(mockedPause).toHaveBeenCalledTimes(1);
    });

    describe("when new line is selected", () => {
      beforeEach(() => {
        const {
          lineRows: [{ text }]
        } = secondLine;
        const newLine = getByText(text);

        fireEvent.press(newLine);
      });

      it("stops speaking", () => {
        expect(mockedStop).toHaveBeenCalledTimes(1);
      });
    });

    describe("when finished speaking", () => {
      beforeEach(async () => {
        const {
          mock: { calls }
        } = mockedSpeak;
        expect(calls.length).toEqual(1);

        const args = calls[0];
        expect(args.length).toEqual(2);

        const { onDone } = args[1];
        act(() => {
          onDone();
        });
      });

      it("deselects original line", () => {
        const { id } = firstLine;
        const originalLine = getByTestId(`play-line-view-${id}`);

        expect(originalLine.props.highlighted).toEqual(false);
      });

      it("selects next line", () => {
        const { id } = secondLine;
        const nextLine = getByTestId(`play-line-view-${id}`);

        expect(nextLine.props.highlighted).toEqual(true);
      });

      it("starts speaking next line", () => {
        const {
          mock: { calls }
        } = mockedSpeak;
        expect(calls.length).toEqual(2);

        const args = calls[1];
        expect(args.length).toEqual(2);

        const [text, { onDone, voice }] = args;
        expect(text).toEqual(getLineText(secondLine));
        expect(onDone).toBeTruthy();
        expect(voice).toEqual("com.apple.ttsbundle.Daniel-compact");
      });
    });
  });

  describe("when paused", () => {
    beforeEach(() => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);
      fireEvent.press(playPauseButton);
    });

    it("resumes speaking when play/pause button pressed", () => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);

      expect(mockedResume).toHaveBeenCalledTimes(1);
    });
  });

  describe("when on last line", () => {
    beforeEach(() => {
      const { id } = secondLine;
      const lastLine = getByTestId(`play-line-${id}`);
      fireEvent.press(lastLine);

      // restore stop mock due to it being called on line press
      mockedStop.mockRestore();
    });

    describe("when finished speaking last line", () => {
      beforeEach(async () => {
        const playPauseButton = getByTestId("play-action");
        fireEvent.press(playPauseButton);

        const {
          mock: { calls }
        } = mockedSpeak;
        expect(calls.length).toEqual(1);

        const args = calls[0];
        expect(args.length).toEqual(2);

        const { onDone } = args[1];
        act(() => {
          onDone();
        });
      });

      it("stops speaking", () => {
        expect(mockedStop).toHaveBeenCalledTimes(1);
      });
    });
  });
});
