import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI
} from "react-native-testing-library";

import PlayListItem from "../PlayListItem";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";

describe("PlayListItem", () => {
  let onPress: jest.Mock;
  let queryByTestId: QueryByAPI["queryByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    onPress = jest.fn();

    ({ queryByTestId, queryByText } = render(
      <PlayListItem {...play} onPress={onPress} />
    ));
  });
  afterEach(cleanup);

  it("renders play title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("renders play description", () => {
    expect(queryByText(play.description)).not.toBeNull();
  });

  it("it calls onPress when pressed", () => {
    const playListItem = queryByTestId("play-list-item");
    fireEvent.press(playListItem);

    expect(onPress).toHaveBeenCalled();
  });
});
