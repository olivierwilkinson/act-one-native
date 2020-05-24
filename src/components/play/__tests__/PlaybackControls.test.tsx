import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  GetByAPI,
  RenderAPI
} from "react-native-testing-library";
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
jest.mock("react-native-reanimation", () => ({
  useTiming: () => [1, () => null, { toValue: { setValue: () => null } }]
}));

import PlaybackControls from "../PlaybackControls";
import AudioContext, { PlaybackState } from "../../../contexts/Audio";

describe("PlaybackControls", () => {
  let setPlaybackState: jest.Mock;
  let getByTestId: GetByAPI["getByTestId"];
  let rerender: RenderAPI["rerender"];

  beforeEach(() => {
    setPlaybackState = jest.fn();

    ({ getByTestId, rerender } = render(
      <AudioContext.Provider
        value={{
          playbackState: PlaybackState.Stopped,
          setPlaybackState
        }}
      >
        <PlaybackControls />
      </AudioContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("sets playbackState to Playing when play/pause button is pressed", () => {
    const playPauseButton = getByTestId("play-action");
    fireEvent.press(playPauseButton);

    expect(setPlaybackState).toHaveBeenCalledWith(PlaybackState.Playing);
  });

  describe("when playbackState changes to Playing", () => {
    beforeEach(() => {
      rerender(
        <AudioContext.Provider
          value={{
            playbackState: PlaybackState.Playing,
            setPlaybackState
          }}
        >
          <PlaybackControls />
        </AudioContext.Provider>
      );
    });

    it("sets playbackState to Paused when play/pause button is pressed", () => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);

      expect(setPlaybackState).toHaveBeenCalledWith(PlaybackState.Paused);
    });
  });

  describe("when playbackState changes to Paused", () => {
    beforeEach(() => {
      rerender(
        <AudioContext.Provider
          value={{
            playbackState: PlaybackState.Paused,
            setPlaybackState
          }}
        >
          <PlaybackControls />
        </AudioContext.Provider>
      );
    });

    it("sets playbackState to Playing when play/pause button is pressed", () => {
      const playPauseButton = getByTestId("play-action");
      fireEvent.press(playPauseButton);

      expect(setPlaybackState).toHaveBeenCalledWith(PlaybackState.Playing);
    });
  });
});
