import "react-native";
import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import { Picker } from "@react-native-community/picker";

import PickerActionSheet, { Props } from "../PickerActionSheet";

const defaultProps = {
  visible: true,
  options: ["option-one", "option-two"],
  initialValue: "option-two",
  onCancel: () => {},
  onDone: () => {}
};

const mount = (props: Partial<Props> = {}) =>
  render(<PickerActionSheet {...defaultProps} {...props} />);

describe("PickerActionSheet", () => {
  it("calls onCancel when cancel button pressed", () => {
    const onCancel = jest.fn();
    const { getByText } = mount({ onCancel });

    fireEvent.press(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  describe("when character selection changes", () => {
    it("resets selected character when cancel button pressed", () => {
      const { getByText, UNSAFE_getByType } = mount();

      fireEvent(UNSAFE_getByType(Picker), "onValueChange", "option-one");
      fireEvent.press(getByText("Cancel"));

      const picker = UNSAFE_getByType(Picker);
      expect(picker.props.selectedValue).toEqual("option-two");
    });

    it("calls onDone with selected character when done button pressed", () => {
      const onDone = jest.fn();
      const { getByText, UNSAFE_getByType } = mount({ onDone });

      fireEvent(UNSAFE_getByType(Picker), "onValueChange", "option-one");
      fireEvent.press(getByText("Done"));

      expect(onDone).toHaveBeenCalledWith("option-one");
    });
  });
});
