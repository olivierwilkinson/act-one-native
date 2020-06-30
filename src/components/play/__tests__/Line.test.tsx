import "react-native";
import React from "react";
import { render, fireEvent, cleanup, act } from "react-native-testing-library";
import Speech from "expo-speech";

import Line from "../Line";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import AppProviders from "../../app/appProviders/AppProviders";
import PlayProviders from "../playProviders/PlayProviders";
import wait from "../../../../test/helpers/wait";
import { SpeechMock } from "../../../../test/mocks/speech";

jest.mock(
  "expo-speech",
  () => jest.requireActual("../../../../test/mocks/speech").default
);

const MockedSpeech = (Speech as unknown) as SpeechMock;

// use second line because first is active by default
const line = play.scenes[0].lines[1];
const lineId = `play-line-${line.id}`;

const mount = () =>
  render(
    <AppProviders>
      <PlayProviders play={play}>
        <Line {...line} />
      </PlayProviders>
    </AppProviders>
  );

describe("Line", () => {
  afterEach(cleanup);

  it("sets active line on press", async () => {
    const { getByTestId } = mount();
    await act(wait);

    fireEvent.press(getByTestId(lineId));
    await act(wait);

    const {
      props: { highlighted }
    } = getByTestId(`play-line-view-${line.id}`);
    expect(highlighted).toEqual(true);
  });

  it("stops audio on press", async () => {
    const { getByTestId } = mount();
    await act(wait);

    MockedSpeech.mockClear();
    fireEvent.press(getByTestId(lineId));
    await act(wait);

    expect(MockedSpeech.stop).toHaveBeenCalledTimes(1);
  });
});
