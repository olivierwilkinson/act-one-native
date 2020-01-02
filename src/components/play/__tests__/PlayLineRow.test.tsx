import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";

import PlayLineRow from "../PlayLineRow";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { findPlayerLine } from "../../../../tests/helpers/play-mock-helpers";
const {
  scenes: [scene]
} = play;
const {
  lineRows: [lineRow]
} = findPlayerLine(scene);

describe("PlayLineRow", () => {
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    ({ queryByText } = render(<PlayLineRow {...lineRow} italic={false} />));
  });
  afterEach(cleanup);

  it("renders text", () => {
    expect(queryByText(lineRow.text)).not.toBeNull();
  });

  it("does not render number", () => {
    expect(queryByText(lineRow.number.toString())).toBeNull();
  });

  describe("when number is divisible by 5", () => {
    const number = 5;
    beforeEach(() => {
      ({ queryByText } = render(
        <PlayLineRow {...lineRow} italic={false} number={number} />
      ));
    });

    it("renders number", () => {
      expect(queryByText(number.toString())).not.toBeNull();
    });
  });
});
