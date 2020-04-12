import "react-native";
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  GetByAPI,
  shallow
} from "react-native-testing-library";

import PickerActionSheet, { Props } from "../PickerActionSheet";

jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});

describe("PickerActionSheet", () => {
  let defaultProps: Props;
  let getByText: GetByAPI["getByText"];
  let getByTestId: GetByAPI["getByTestId"];
  beforeEach(() => {
    defaultProps = {
      visible: true,
      options: ["option-one", "option-two"],
      initialValue: "option-two",
      onCancel: jest.fn(),
      onDone: jest.fn()
    };

    ({ getByText, getByTestId } = render(
      <PickerActionSheet {...defaultProps} />
    ));
  });
  afterEach(cleanup);

  it("renders picker correctly", () => {
    const { output } = shallow(getByTestId("action-sheet-picker"));
    expect(output).toMatchSnapshot();
  });

  it("calls onCancel when cancel button pressed", () => {
    fireEvent.press(getByText("Cancel"));

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  describe("when character selection changes", () => {
    beforeEach(() => {
      fireEvent(
        getByTestId("action-sheet-picker"),
        "onValueChange",
        "option-one"
      );
    });

    it("resets selected character when cancel button pressed", () => {
      fireEvent.press(getByText("Cancel"));

      const picker = getByTestId("action-sheet-picker");
      expect(picker.props.selectedValue).toEqual("option-two");
    });

    it("calls onDone with selected character when done button pressed", () => {
      fireEvent.press(getByText("Done"));

      expect(defaultProps.onDone).toHaveBeenCalledWith("option-one");
    });
  });
});
