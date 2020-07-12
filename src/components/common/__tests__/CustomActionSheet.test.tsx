import { Text, Modal } from "react-native";
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  QueryByAPI,
  GetByAPI,
  RenderAPI
} from "react-native-testing-library";

import CustomActionSheet, { Props } from "../CustomActionSheet";

describe("CustomActionSheet", () => {
  let queryByText: QueryByAPI["queryByText"];
  let getByText: GetByAPI["getByText"];
  let rerender: RenderAPI["rerender"];
  let getByType: RenderAPI["UNSAFE_getByType"];
  let defaultProps: Props;

  beforeEach(() => {
    defaultProps = {
      visible: false,
      children: <Text>Custom Content</Text>,
      onCancel: jest.fn()
    };

    ({ queryByText, getByText, UNSAFE_getByType: getByType, rerender } = render(
      <CustomActionSheet {...defaultProps} />
    ));
  });
  afterEach(cleanup);

  it("renders correctly when is visible is false", () => {
    const modal = getByType(Modal);
    expect(modal.props.visible).toEqual(false);
  });

  describe("when visible is true", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        visible: true
      };

      rerender(<CustomActionSheet {...defaultProps} />);
    });

    it("renders correctly", () => {
      const modal = getByType(Modal);
      expect(modal.props.visible).toEqual(true);
    });

    it("renders children", () => {
      expect(queryByText("Custom Content")).not.toBeNull();
    });

    it("renders cancel button", () => {
      expect(queryByText("Cancel")).not.toBeNull();
    });

    it("calls onCancel when cancel button pressed", () => {
      const cancelButton = getByText("Cancel");
      fireEvent.press(cancelButton);

      expect(defaultProps.onCancel).toHaveBeenCalled();
    });

    describe("when onDone passed", () => {
      beforeEach(() => {
        defaultProps = {
          ...defaultProps,
          onDone: jest.fn()
        };

        ({ queryByText, getByText } = render(
          <CustomActionSheet {...defaultProps} />
        ));
      });

      it("renders done button", () => {
        expect(queryByText("Done")).not.toBeNull();
      });

      it("calls onDone when done button pressed", () => {
        const doneButton = getByText("Done");
        fireEvent.press(doneButton);

        expect(defaultProps.onDone).toHaveBeenCalled();
      });
    });
  });
});
