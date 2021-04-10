import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import PlayListContainer, { Props } from "../PlayListContainer";
import AppProviders from "../../../app/appProviders/AppProviders";
import { otherPlay, play } from "../../../../../test/graphql/mocks/play";

const mount = ({ goToPlay = jest.fn() }: Partial<Props> = {}) =>
  render(
    <AppProviders>
      <PlayListContainer goToPlay={goToPlay} />
    </AppProviders>
  );

describe("PlayListContainer", () => {
  it("renders play list", async () => {
    const screen = mount();

    await waitFor(() => expect(screen.getByText(play.title)).toBeDefined());
    expect(screen.getByText(otherPlay.title)).toBeDefined();
  });

  it("calls goToPlay with play on list item press", async () => {
    const goToPlay = jest.fn();
    const screen = mount({
      goToPlay
    });

    fireEvent.press(await screen.findByText(play.title));

    expect(goToPlay).toHaveBeenCalledWith(play.id);
  });
});
