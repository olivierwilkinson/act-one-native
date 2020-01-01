import "react-native";
import React from "react";
import { render } from "react-native-testing-library";

import Header from "../Header";

describe("Header", () => {
  let queryByText;
  beforeEach(() => {
    ({ queryByText } = render(<Header />));
  });

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("does not render back button", () => {
    expect(queryByText("Back")).toBeNull();
  });

  describe("when passed onBack", () => {
    beforeEach(() => {
      ({ queryByText } = render(<Header onBack={() => null} />));
    });

    it("renders back button", () => {
      expect(queryByText("Back")).not.toBeNull();
    });
  });

  describe("when passed title", () => {
    const title = "Test Title";
    beforeEach(() => {
      ({ queryByText } = render(<Header title={title} />));
    });

    it("renders passed title", () => {
      expect(queryByText(title)).not.toBeNull();
    });
  });
});
