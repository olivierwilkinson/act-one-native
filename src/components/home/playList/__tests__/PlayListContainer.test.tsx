import "react-native";
import React from "react";
import { render, fireEvent, waitFor } from "react-native-testing-library";

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import PlayListContainer, { Props } from "../PlayListContainer";
import AppProviders from "../../../app/appProviders/AppProviders";

const mount = ({ plays, goToPlay }: Props) =>
  render(
    <AppProviders>
      <PlayListContainer plays={plays} goToPlay={goToPlay} />
    </AppProviders>
  );

describe("PlayList", () => {
  it("renders play list item", async () => {
    const { queryByText } = mount({
      plays: [play],
      goToPlay: jest.fn()
    });

    await waitFor(() => expect(queryByText(play.title)).not.toBeNull());
  });

  it("calls goToPlay with play on list item press", async () => {
    const goToPlay = jest.fn();
    const { findByTestId } = mount({
      plays: [play],
      goToPlay
    });

    const playListItem = await findByTestId("play-list-item");
    fireEvent.press(playListItem);

    expect(goToPlay).toHaveBeenCalledWith(play);
  });
});
