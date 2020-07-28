import "react-native";
import React from "react";
import { render, fireEvent, GetByAPI } from "react-native-testing-library";
import { Picker } from "@react-native-community/picker";

import PickerActionSheet, { Props } from "../PickerActionSheet";

describe("PickerActionSheet", () => {
  let defaultProps: Props;
  let getByText: GetByAPI["getByText"];
  let getByType: GetByAPI["UNSAFE_getByType"];
  beforeEach(() => {
    defaultProps = {
      visible: true,
      options: ["option-one", "option-two"],
      initialValue: "option-two",
      onCancel: jest.fn(),
      onDone: jest.fn()
    };

    ({ getByText, UNSAFE_getByType: getByType } = render(
      <PickerActionSheet {...defaultProps} />
    ));
  });

  it("calls onCancel when cancel button pressed", () => {
    fireEvent.press(getByText("Cancel"));

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  describe("when character selection changes", () => {
    beforeEach(() => {
      fireEvent(getByType(Picker), "onValueChange", "option-one");
    });

    it("resets selected character when cancel button pressed", () => {
      fireEvent.press(getByText("Cancel"));

      const picker = getByType(Picker);
      expect(picker.props.selectedValue).toEqual("option-two");
    });

    it("calls onDone with selected character when done button pressed", () => {
      fireEvent.press(getByText("Done"));

      expect(defaultProps.onDone).toHaveBeenCalledWith("option-one");
    });
  });
});
