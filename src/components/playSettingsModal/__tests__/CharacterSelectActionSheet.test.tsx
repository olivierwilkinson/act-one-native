import "react-native";
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  GetByAPI,
  shallow
} from "react-native-testing-library";

import CharacterSelectActionSheet, {
  Props
} from "../CharacterSelectActionSheet";

jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});

describe("CharacterSelectActionSheet", () => {
  let defaultProps: Props;
  let getByText: GetByAPI["getByText"];
  let getByTestId: GetByAPI["getByTestId"];
  beforeEach(() => {
    defaultProps = {
      visible: true,
      players: ["test-character-one", "test-character-two"],
      currentPlayer: "test-character-two",
      onCancel: jest.fn(),
      onDone: jest.fn()
    };

    ({ getByText, getByTestId } = render(
      <CharacterSelectActionSheet {...defaultProps} />
    ));
  });
  afterEach(cleanup);

  it("renders picker correctly", () => {
    const { output } = shallow(getByTestId("character-select-picker"));
    expect(output).toMatchSnapshot();
  });

  it("calls onCancel when cancel button pressed", () => {
    fireEvent.press(getByText("Cancel"));

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  describe("when character selection changes", () => {
    beforeEach(() => {
      fireEvent(
        getByTestId("character-select-picker"),
        "onValueChange",
        "test-character-one"
      );
    });

    it("resets resets selected character when cancel button pressed", () => {
      fireEvent.press(getByText("Cancel"));

      const picker = getByTestId("character-select-picker");
      expect(picker.props.selectedValue).toEqual("test-character-two");
    });

    it("calls onDone with selected character when done button pressed", () => {
      fireEvent.press(getByText("Done"));

      expect(defaultProps.onDone).toHaveBeenCalledWith("test-character-one");
    });
  });
});
