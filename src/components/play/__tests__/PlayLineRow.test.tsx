import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";

import PlayLineRow from "../PlayLineRow";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { Line } from "../../../types/play-types";
const {
  scenes: [scene]
} = play;
const {
  lineRows: [lineRow]
} = scene.lines.find(({ player }) => player) as Line;

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
    expect.assertions(1);
    if (!lineRow.number) {
      return;
    }

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
