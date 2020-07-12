import { ActivityIndicator } from "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  RenderAPI
} from "react-native-testing-library";

import PageLoading, { Props } from "../PageLoading";

describe("PageLoading", () => {
  let defaultProps: Props;
  let queryByText: QueryByAPI["queryByText"];
  let queryByType: QueryByAPI["UNSAFE_queryByType"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {};

    ({ queryByText, UNSAFE_queryByType: queryByType, rerender } = render(
      <PageLoading />
    ));
  });
  afterEach(cleanup);

  it("renders activity indicator", () => {
    expect(queryByType(ActivityIndicator)).not.toBeNull();
  });

  describe("when message passed", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        message: "Test error message"
      };

      rerender(<PageLoading {...defaultProps} />);
    });

    it("renders message", () => {
      expect(queryByText(defaultProps.message!)).not.toBeNull();
    });
  });
});
