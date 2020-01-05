import "react-native";
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  QueryByAPI,
  GetByAPI
} from "react-native-testing-library";

import Header from "../Header";

describe("Header", () => {
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    ({ queryByText } = render(<Header />));
  });
  afterEach(cleanup);

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("does not render back button", () => {
    expect(queryByText("Back")).toBeNull();
  });

  it("does not render cancel button", () => {
    expect(queryByText("Cancel")).toBeNull();
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

  describe("when passed onBack", () => {
    let getByText: GetByAPI["getByText"];
    let onBack: jest.Mock;
    beforeEach(() => {
      onBack = jest.fn();

      ({ queryByText, getByText } = render(<Header onBack={onBack} />));
    });

    it("renders back button", () => {
      expect(queryByText("Back")).not.toBeNull();
    });

    it("calls onBack on back button press", () => {
      const backButton = getByText("Back");
      fireEvent.press(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("when passed onCancel", () => {
    let getByText: GetByAPI["getByText"];
    let onCancel: jest.Mock;
    beforeEach(() => {
      onCancel = jest.fn();

      ({ queryByText, getByText } = render(<Header onCancel={onCancel} />));
    });

    it("renders cancel button", () => {
      expect(queryByText("Cancel")).not.toBeNull();
    });

    it("calls onCancel on back button press", () => {
      const cancelButton = getByText("Cancel");
      fireEvent.press(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });
});
