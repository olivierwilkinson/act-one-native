import "react-native";
import "react-native-reanimated";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import App from "../App";
import { play } from "../test/graphql/mocks/play";
import navigationMock from "../test/mocks/navigation";

const mount = () => render(<App />);

describe("App", () => {
  it("renders header", async () => {
    const screen = mount();

    await waitFor(() => expect(screen.queryByText("ActOne")).not.toBeNull());
  });

  it("renders home screen initially", async () => {
    const screen = mount();

    await waitFor(() =>
      expect(screen.queryByTestId("play-list")).not.toBeNull()
    );
  });

  it("can navigate to play screen", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByText(play.title));

    await waitFor(() => navigationMock.navigate.mock.calls[0][0] === "Play");
    expect(navigationMock.navigate.mock.calls[0][1]).toEqual({
      playId: play.id
    });
  });
});
