import "react-native";
import React from "react";
import { render } from "react-native-testing-library";

import LineRow, { Props } from "../LineRow";
import { lineRow } from "../../../../../test/graphql/mocks/lineRow";

const defaultProps = {
  ...lineRow,
  italic: false
};

const mount = (props: Partial<Props> = {}) =>
  render(<LineRow {...defaultProps} {...props} />);

describe("LineRow", () => {
  it("renders text", () => {
    const screen = mount();

    expect(screen.queryByText(lineRow.text)).not.toBeNull();
  });

  it("does not render number", () => {
    const screen = mount();

    expect(screen.queryByText(lineRow.number!.toString())).toBeNull();
  });

  it("renders number if divisible by 5", () => {
    const screen = mount({ number: 15 });

    expect(screen.queryByText("15")).not.toBeNull();
  });
});
