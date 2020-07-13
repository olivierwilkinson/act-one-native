import { Text } from "react-native";
import React from "react";
import { render, RenderAPI } from "react-native-testing-library";

import Overlay, { Props } from "../Overlay";

describe("Header", () => {
  let defaultProps: Props;
  let toJSON: RenderAPI["toJSON"];
  beforeEach(() => {
    defaultProps = {
      children: <Text>Overlay Content</Text>
    };

    ({ toJSON } = render(<Overlay {...defaultProps} />));
  });

  it("renders correctly", () => {
    expect(toJSON()).toMatchSnapshot();
  });
});
