import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  GetByAPI,
  RenderAPI,
  QueryByAPI
} from "react-native-testing-library";

import PlaybackControls from "../PlaybackControls";
import AudioContext, { AudioState } from "../../../contexts/Audio";
import PlaybackModeContext from "../../../contexts/PlaybackMode";
import { PlaybackMode } from "../../../types/playback-types";

jest.mock("react-native-reanimated", () =>
  jest.requireActual("react-native-reanimated/mock")
);

describe("PlaybackControls", () => {
  let setAudioState: jest.Mock;
  let setMode: jest.Mock;
  let getByTestId: GetByAPI["getByTestId"];
  let getByText: GetByAPI["getByText"];
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  let rerender: RenderAPI["rerender"];

  beforeEach(() => {
    setAudioState = jest.fn();
    setMode = jest.fn();
  });
  afterEach(cleanup);

  describe("when in Play mode", () => {
    beforeEach(() => {
      ({
        getByTestId,
        getByText,
        queryByTestId,
        queryByText,
        rerender
      } = render(
        <AudioContext.Provider
          value={{
            audioState: AudioState.Stopped,
            setAudioState
          }}
        >
          <PlaybackModeContext.Provider
            value={{
              mode: PlaybackMode.Play,
              setMode
            }}
          >
            <PlaybackControls />
          </PlaybackModeContext.Provider>
        </AudioContext.Provider>
      ));
    });

    it("renders play button", () => {
      expect(queryByTestId("play-action")).not.toBeNull();
    });

    it("renders play header", () => {
      expect(queryByText("PLAY")).not.toBeNull();
    });

    it("renders record header", () => {
      expect(queryByText("RECORD")).not.toBeNull();
    });

    it("sets audioState to Playing when play button is pressed", () => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);

      expect(setAudioState).toHaveBeenCalledWith(AudioState.Playing);
    });

    it("sets mode to Record when record header is pressed", () => {
      const recordHeader = getByText("RECORD");
      fireEvent.press(recordHeader);

      expect(setMode).toHaveBeenCalledWith(PlaybackMode.Record);
    });

    it.skip("sets mode to Record on swipe left", () => {
      fireEvent(
        getByTestId("playback-controls"),
        "onGestureHandlerStateChange",
        {
          nativeEvent: {
            numberOfPointers: 1,
            oldState: 4,
            state: 5
          }
        }
      );

      expect(setMode).toHaveBeenCalledWith(PlaybackMode.Record);
    });

    // no way to check values of styles using existing reanimated mock
    it.todo("hides the record button");
    it.todo("animates header correctly");
    it.todo("animates buttons correctly");

    describe("when audioState changes to Playing", () => {
      beforeEach(() => {
        rerender(
          <AudioContext.Provider
            value={{
              audioState: AudioState.Playing,
              setAudioState
            }}
          >
            <PlaybackModeContext.Provider
              value={{
                mode: PlaybackMode.Play,
                setMode
              }}
            >
              <PlaybackControls />
            </PlaybackModeContext.Provider>
          </AudioContext.Provider>
        );
      });

      it("sets audioState to Paused when play button is pressed", () => {
        const playPauseButton = getByTestId("play-action");
        fireEvent.press(playPauseButton);

        expect(setAudioState).toHaveBeenCalledWith(AudioState.Paused);
      });

      it("sets audioState to Stopped when record header is pressed", () => {
        const recordHeader = getByText("RECORD");
        fireEvent.press(recordHeader);

        expect(setAudioState).toHaveBeenCalledWith(AudioState.Stopped);
      });
    });

    describe("when audioState changes to Paused", () => {
      beforeEach(() => {
        rerender(
          <AudioContext.Provider
            value={{
              audioState: AudioState.Paused,
              setAudioState
            }}
          >
            <PlaybackModeContext.Provider
              value={{
                mode: PlaybackMode.Play,
                setMode
              }}
            >
              <PlaybackControls />
            </PlaybackModeContext.Provider>
          </AudioContext.Provider>
        );
      });

      it("sets audioState to Playing when play button is pressed", () => {
        const playPauseButton = getByTestId("play-action");
        fireEvent.press(playPauseButton);

        expect(setAudioState).toHaveBeenCalledWith(AudioState.Playing);
      });
    });
  });

  describe("when in Record mode", () => {
    beforeEach(() => {
      ({
        getByTestId,
        getByText,
        queryByTestId,
        queryByText,
        rerender
      } = render(
        <AudioContext.Provider
          value={{
            audioState: AudioState.Stopped,
            setAudioState
          }}
        >
          <PlaybackModeContext.Provider
            value={{
              mode: PlaybackMode.Record,
              setMode
            }}
          >
            <PlaybackControls />
          </PlaybackModeContext.Provider>
        </AudioContext.Provider>
      ));
    });

    it("renders record button", () => {
      expect(queryByTestId("record-action")).not.toBeNull();
    });

    it("renders play header", () => {
      expect(queryByText("PLAY")).not.toBeNull();
    });

    it("renders record header", () => {
      expect(queryByText("RECORD")).not.toBeNull();
    });

    it("sets audioState to Recording when record button is pressed", () => {
      const recordButton = getByTestId("record-action");
      fireEvent.press(recordButton);

      expect(setAudioState).toHaveBeenCalledWith(AudioState.Recording);
    });

    it("sets mode to Play when play header is pressed", () => {
      const playHeader = getByText("PLAY");
      fireEvent.press(playHeader);

      expect(setMode).toHaveBeenCalledWith(PlaybackMode.Play);
    });

    it.skip("sets mode to Play on swipe right", () => {
      fireEvent(
        getByTestId("playback-controls"),
        "onGestureHandlerStateChange",
        {
          nativeEvent: {
            numberOfPointers: 1,
            oldState: 4,
            state: 5
          }
        }
      );

      expect(setMode).toHaveBeenCalledWith(PlaybackMode.Record);
    });

    // no way to check values of styles using existing reanimated mock
    it.todo("hides the play button");
    it.todo("animates header correctly");
    it.todo("animates buttons correctly");

    describe("when audioState changes to Recording", () => {
      beforeEach(() => {
        rerender(
          <AudioContext.Provider
            value={{
              audioState: AudioState.Recording,
              setAudioState
            }}
          >
            <PlaybackModeContext.Provider
              value={{
                mode: PlaybackMode.Record,
                setMode
              }}
            >
              <PlaybackControls />
            </PlaybackModeContext.Provider>
          </AudioContext.Provider>
        );
      });

      it("sets audioState to Stopped when record button is pressed", () => {
        const recordButton = getByTestId("record-action");
        fireEvent.press(recordButton);

        expect(setAudioState).toHaveBeenCalledWith(AudioState.Stopped);
      });

      it("sets audioState to Stopped when play header is pressed", () => {
        const playHeader = getByText("PLAY");
        fireEvent.press(playHeader);

        expect(setAudioState).toHaveBeenCalledWith(AudioState.Stopped);
      });
    });
  });
});
