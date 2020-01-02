import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";

import PlayList from "../PlayList";
import play from "../../../../tests/mocks/play";

describe("PlayList", () => {
  let goToPlay: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    goToPlay = jest.fn();

    ({ queryByText } = render(<PlayList plays={[play]} goToPlay={goToPlay} />));
  });
  afterEach(cleanup);

  it("renders play list item", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
