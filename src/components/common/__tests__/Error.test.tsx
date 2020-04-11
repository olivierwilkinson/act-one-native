import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";

import Error from "../Error";

describe("Error", () => {
  let message: string;
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    message = "Test error message";
    ({ queryByText } = render(<Error message={message} />));
  });
  afterEach(cleanup);

  it("renders message", () => {
    expect(queryByText(message)).not.toBeNull();
  });
});
