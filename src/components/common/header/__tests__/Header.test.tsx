import { Text } from "react-native";
import React from "react";
import {
  render,
  fireEvent,
  QueryByAPI,
  GetByAPI,
  RenderAPI
} from "react-native-testing-library";

import Header, { Props } from "../Header";

describe("Header", () => {
  let defaultProps: Props;
  let queryByText: QueryByAPI["queryByText"];
  let getByText: GetByAPI["getByText"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {};

    ({ queryByText, getByText, rerender } = render(
      <Header {...defaultProps} />
    ));
  });

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  describe("when passed title", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        title: "Test Title"
      };

      rerender(<Header {...defaultProps} />);
    });

    it("renders passed title", () => {
      expect(queryByText(defaultProps.title!)).not.toBeNull();
    });
  });

  describe("when passed left HeaderAction", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        left: {
          onPress: jest.fn(),
          view: <Text>Back</Text>
        }
      };

      rerender(<Header {...defaultProps} />);
    });

    it("renders view", () => {
      expect(queryByText("Back")).not.toBeNull();
    });

    it("calls onPress on view press", () => {
      const backButton = getByText("Back");
      fireEvent.press(backButton);

      expect(defaultProps.left!.onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe("when passed right HeaderAction", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        right: {
          onPress: jest.fn(),
          view: <Text>Cancel</Text>
        }
      };

      rerender(<Header {...defaultProps} />);
    });

    it("renders view", () => {
      expect(queryByText("Cancel")).not.toBeNull();
    });

    it("calls onPress on view press", () => {
      const backButton = getByText("Cancel");
      fireEvent.press(backButton);

      expect(defaultProps.right!.onPress).toHaveBeenCalledTimes(1);
    });
  });
});
