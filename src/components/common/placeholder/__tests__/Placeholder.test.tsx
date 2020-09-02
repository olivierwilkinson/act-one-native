import { ActivityIndicator } from "react-native";
import React from "react";
import { render, QueryByAPI, RenderAPI } from "react-native-testing-library";

import Placeholder, { Props } from "../Placeholder";

describe("Placeholder", () => {
  let defaultProps: Props;
  let queryByText: QueryByAPI["queryByText"];
  let queryByType: QueryByAPI["UNSAFE_queryByType"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {};

    ({ queryByText, UNSAFE_queryByType: queryByType, rerender } = render(
      <Placeholder />
    ));
  });

  describe("when loading passed", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        loading: true
      };

      rerender(<Placeholder {...defaultProps} />);
    });

    it("renders activity indicator", () => {
      expect(queryByType(ActivityIndicator)).not.toBeNull();
    });
  });

  describe("when message passed", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        message: "Test error message"
      };

      rerender(<Placeholder {...defaultProps} />);
    });

    it("renders message", () => {
      expect(queryByText(defaultProps.message!)).not.toBeNull();
    });
  });
});
