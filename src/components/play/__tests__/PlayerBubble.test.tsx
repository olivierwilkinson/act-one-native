import "react-native";
import React from "react";
import { render, cleanup, RenderAPI } from "react-native-testing-library";

import PlayerBubble, { Props } from "../PlayerBubble";

describe("PlayerBubble", () => {
  let defaultProps: Props;
  let toJSON: RenderAPI["toJSON"];
  beforeEach(() => {
    defaultProps = {
      player: "Professor Poopy Pants",
      colour: {
        red: 0,
        green: 0,
        blue: 0
      },
      highlighted: false,
      style: { backgroundColor: "papayawhip" }
    };

    ({ toJSON } = render(<PlayerBubble {...defaultProps} />));
  });
  afterEach(cleanup);

  it("renders correctly", () => {
    expect(toJSON()).toMatchSnapshot();
  });
});
