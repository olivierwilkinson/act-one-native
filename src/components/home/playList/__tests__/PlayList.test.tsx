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

describe("PlayList", () => {
  let goToPlay: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let getByTestId: GetByAPI["getByTestId"];
  beforeEach(() => {
    goToPlay = jest.fn();

    ({ queryByText, getByTestId } = render(
      <PlayList plays={[play]} goToPlay={goToPlay} />
    ));
  });

  it("renders play list item", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("calls goToPlay with play on list item press", () => {
    const playListItem = getByTestId("play-list-item");
    fireEvent.press(playListItem);

    expect(goToPlay).toHaveBeenCalledWith(play);
  });
});
