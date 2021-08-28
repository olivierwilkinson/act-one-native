import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";
import "@react-navigation/native";

import Play from "../Play";
import AppProviders from "../../app/appProviders/AppProviders";
import PlayProviders from "../playProviders/PlayProviders";
import SpeechMock from "../../../../test/mocks/speech";
import pressById from "../../../../test/actions/pressById";
import { line, otherLine } from "../../../../test/graphql/mocks/line";
import { lineRow, otherLineRow } from "../../../../test/graphql/mocks/lineRow";
import { play } from "../../../../test/graphql/mocks/play";
import { SectionList } from "react-native";

const mount = () => {
  const result = render(
    <AppProviders>
      <PlayProviders playId={play.id}>
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
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("play-scene-header")).not.toBeNull()
    );
  });

  it("renders play scene lines", async () => {
    const screen = mount();

    await waitFor(() => expect(screen.getByText(lineRow.text)).toBeDefined());
  });

  it("renders play scene controls", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("playback-controls")).not.toBeNull()
    );
  });

  it("starts speaking when play button pressed", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    await screen.pressPlayButton();
    SpeechMock.startSpeaking();

    const {
      mock: { calls }
    } = SpeechMock.speak;
    expect(calls.length).toEqual(1);

    const [args] = calls;
    expect(args.length).toEqual(2);

    const [text] = args;
    expect(text).toEqual(lineRow.text);
  });

  it("can pause speech", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    // start speech
    await screen.pressPlayButton();

    // notify that speech has started
    SpeechMock.startSpeaking();

    // pause speech
    await screen.pressPlayButton();

    expect(SpeechMock.pause).toHaveBeenCalledTimes(1);
  });

  it("can resume speech", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    // start and then pause speech
    await screen.pressPlayButton();
    SpeechMock.startSpeaking();
    await screen.pressPlayButton();

    // resume speech
    await screen.pressPlayButton();

    expect(SpeechMock.resume).toHaveBeenCalledTimes(1);
  });

  it("stops speaking when new line is selected", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    // start speech
    fireEvent.press(screen.getByTestId("play-button"));
    SpeechMock.startSpeaking();

    expect(SpeechMock.stop).not.toHaveBeenCalled();

    // press new line
    fireEvent.press(await screen.findByTestId(`play-line-${line.id}`));

    await waitFor(() => expect(SpeechMock.stop).toHaveBeenCalled());
  });

  it("scrolls lines to the top when scene changes", async () => {
    const scrollToLocationSpy = jest.spyOn(
      SectionList.prototype,
      "scrollToLocation"
    );
    const screen = mount();

    // wait for scene to load and then clear spy to prevent false passes
    await screen.findByText("ACT 1 - SCENE 1");
    scrollToLocationSpy.mockClear();

    // change the scene
    fireEvent.press(await screen.findByTestId("next-scene-button"));

    await waitFor(() =>
      expect(scrollToLocationSpy).toHaveBeenCalledWith({
        animated: false,
        sectionIndex: 0,
        itemIndex: 0
      })
    );
  });

  it.only("scrolls lines to the top when act changes", async () => {
    const scrollToLocationSpy = jest.spyOn(
      SectionList.prototype,
      "scrollToLocation"
    );
    const screen = mount();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await screen.findByText("ACT 1 - SCENE 2");

    scrollToLocationSpy.mockClear();

    fireEvent.press(await screen.findByTestId("next-scene-button"));
    await screen.findByText("ACT 2 - SCENE 1");

    expect(scrollToLocationSpy).toHaveBeenCalledWith({
      animated: false,
      sectionIndex: 0,
      itemIndex: 0
    });
  });

  // Might actually be broken
  it.skip("selects next line when speaking finishes", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    // start and finish speech
    fireEvent.press(screen.getByTestId("play-button"));
    SpeechMock.startSpeaking();
    SpeechMock.finishSpeaking();

    expect(
      screen.getByTestId(`play-line-view-${line.id}`).props.highlighted
    ).toEqual(false);
    expect(
      screen.getByTestId(`play-line-view-${otherLine.id}`).props.highlighted
    ).toEqual(true);
  });

  // Might actually be broken
  it.skip("speaks next line when speaking finishes", async () => {
    const screen = mount();
    await waitFor(() => screen.getByText(lineRow.text));

    fireEvent.press(screen.getByTestId("play-button"));
    SpeechMock.startSpeaking();
    SpeechMock.mockClear();
    SpeechMock.finishSpeaking();

    const {
      mock: { calls }
    } = SpeechMock.speak;
    expect(calls.length).toEqual(1);

    const args = calls[0];
    expect(args.length).toEqual(2);

    const [text, { onDone, voice }] = args;
    expect(text).toEqual(screen.getByText(otherLineRow.text));
    expect(onDone).toBeTruthy();
    expect(voice).toEqual("com.apple.ttsbundle.Daniel-compact");
  });
});
