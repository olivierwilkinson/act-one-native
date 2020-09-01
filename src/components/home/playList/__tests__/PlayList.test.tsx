import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  QueryByAPI,
  GetByAPI
} from "react-native-testing-library";

import PlayList from "../PlayList";
import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import AppProviders from "../../../app/appProviders/AppProviders";

describe("PlayList", () => {
  let goToPlay: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let getByTestId: GetByAPI["getByTestId"];
  beforeEach(() => {
    goToPlay = jest.fn();

    ({ queryByText, getByTestId } = render(
      <AppProviders>
        <PlayList plays={[play]} goToPlay={goToPlay} />
      </AppProviders>
    ));
  });

  it("renders play list item", () => {
    expect(queryByText(play.title)).not.toBeNull();
  });

  it("calls goToPlay with play on list item press", () => {
    const playListItem = getByTestId("play-list-item");
    fireEvent.press(playListItem);

    expect(goToPlay).toHaveBeenCalledWith(play);
  });
});
