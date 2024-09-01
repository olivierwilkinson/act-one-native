import "react-native";
import React from "react";
import {
  render,
  RenderAPI,
  fireEvent,
  GetByAPI
} from "react-native-testing-library";

import SettingsRow, { Props } from "../SettingsRow";

describe("SettingsRow", () => {
  let defaultProps: Props;
  let getByText: GetByAPI["getByText"];
  let getByTestId: GetByAPI["getByTestId"];
  let toJSON: RenderAPI["toJSON"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {
      label: "Setting label"
    };

    ({ getByText, getByTestId, toJSON, rerender } = render(
      <SettingsRow {...defaultProps} />
    ));
  });

  it("renders correctly", () => {
    expect(toJSON()).toMatchSnapshot();
  });

  describe("when passed onPress", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        onPress: jest.fn()
      };

      rerender(<SettingsRow {...defaultProps} />);
    });

    it("renders right arrow", () => {
      expect(getByTestId("settings-row-right-arrow")).not.toBeNull();
    });

    it("calls onPress when pressed", () => {
      fireEvent.press(getByText(defaultProps.label));

      expect(defaultProps.onPress).toHaveBeenCalled();
    });
  });

  describe("when passed leftIconName", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        leftIconName: "airplane"
      };

      rerender(<SettingsRow {...defaultProps} />);
    });

    it("renders left icon", () => {
      expect(getByTestId("settings-row-left-icon")).not.toBeNull();
    });
  });
});
