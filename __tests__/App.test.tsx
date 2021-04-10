import "react-native";
import "react-native-reanimated";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import App from "../App";
import { play } from "../test/graphql/mocks/play";

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

  it("can navigate to play screen and back", async () => {
    const screen = mount();

    fireEvent.press(await screen.findByText(play.title));
    await waitFor(() =>
      expect(screen.getByText("ACT 1 - SCENE 1")).toBeDefined()
    );

    fireEvent.press(screen.getByTestId("header-left-button"));
    await waitFor(async () =>
      expect(screen.getByTestId("play-list")).toBeDefined()
    );
  });
});
