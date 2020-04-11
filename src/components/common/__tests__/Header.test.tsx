import { Text } from "react-native";
import React from "react";
import {
  render,
  cleanup,
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
  let getByTestId: GetByAPI["getByTestId"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {};

    ({ queryByText, getByText, getByTestId, rerender } = render(
      <Header {...defaultProps} />
    ));
  });
  afterEach(cleanup);

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

    describe("when left header action is passed disabled", () => {
      beforeEach(() => {
        defaultProps = {
          ...defaultProps,
          left: {
            ...defaultProps.left!,
            disabled: true
          }
        };

        rerender(<Header {...defaultProps} />);
      });

      it("disables left header button", () => {
        const button = getByTestId("header-left-button");
        expect(button.props.disabled).toEqual(true);
      });
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

    describe("when right header action is passed disabled", () => {
      beforeEach(() => {
        defaultProps = {
          ...defaultProps,
          right: {
            ...defaultProps.right!,
            disabled: true
          }
        };

        rerender(<Header {...defaultProps} />);
      });

      it("disables right header button", () => {
        const button = getByTestId("header-right-button");
        expect(button.props.disabled).toEqual(true);
      });
    });
  });
});
