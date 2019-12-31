import * as Speech from "expo-speech";

import { Play, Line } from "../types/play-types";

export enum PlaybackState {
  Playing = "PLAYING",
  Paused = "PAUSED",
  Stopped = "STOPPED",
  Done = "DONE"
}

export default class PlayAudioController {
  constructor({ scenes }: Play) {
    this.lines = [].concat(...scenes.map(({ lines }) => lines));
    this.currentLineIndex = 0;
  }

  private lines: Line[];
  private currentLineIndex: number;
  playbackState: PlaybackState;

  private setPlaybackState(playbackState: PlaybackState): void {
    this.onPlaybackStateChange(playbackState);
    this.playbackState = playbackState;
  }

  private currentLineText() {
    const line = this.lines[this.currentLineIndex];
    if (!line) {
      return "";
    }

    return line.lineRows.reduce((text, row) => `${text} ${row.text}`, "");
  }

  setLineById: (id: number) => void = id => {
    this.currentLineIndex = this.lines.findIndex(
      (line: Line) => line.id === id
    );
  };

  onPlaybackStateChange: (playbackState: PlaybackState) => void = () => null;
  onDone = () => null;

  play = () =>
    Speech.speak(this.currentLineText(), {
      onStart: () => this.setPlaybackState(PlaybackState.Playing),
      onDone: () => {
        this.setPlaybackState(PlaybackState.Done);
        this.onDone();
      }
    });

  pause = () => {
    Speech.pause();
    this.setPlaybackState(PlaybackState.Paused);
  };

  stop = () => {
    Speech.stop();
    this.setPlaybackState(PlaybackState.Stopped);
  };

  resume = () => {
    Speech.resume();
    this.setPlaybackState(PlaybackState.Paused);
  };
}
