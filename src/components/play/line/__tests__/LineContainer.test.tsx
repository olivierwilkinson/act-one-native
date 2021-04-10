import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";
import Speech from "expo-speech";

import LineContainer from "../LineContainer";
import AppProviders from "../../../app/appProviders/AppProviders";
import PlayProviders from "../../playProviders/PlayProviders";
import { SpeechMock } from "../../../../../test/mocks/speech";
import { play } from "../../../../../test/graphql/mocks/play";
import { otherLine } from "../../../../../test/graphql/mocks/line";

const MockedSpeech = (Speech as unknown) as SpeechMock;

// use otherLine as line is active by default
const line = {
  ...otherLine,
  lineRows: []
};

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders playId={play.id}>
        <LineContainer {...line} />
      </PlayProviders>
    </AppProviders>
  );

describe("Line", () => {
  it("sets active line on press", async () => {
    const screen = mount();
    fireEvent.press(await screen.findByTestId(`play-line-${line.id}`));

    const {
      props: { highlighted }
    } = screen.getByTestId(`play-line-view-${line.id}`);
    expect(highlighted).toEqual(true);
  });

  it("stops audio on press", async () => {
    const screen = mount();
    fireEvent.press(await screen.findByTestId(`play-line-${line.id}`));

    await waitFor(() => expect(MockedSpeech.stop).toHaveBeenCalledTimes(1));
  });
});
