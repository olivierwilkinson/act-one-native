import { View, Text } from "react-native";
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

  describe("when passed title", () => {
    const title = "Test Title";
    beforeEach(() => {
      ({ queryByText } = render(<Header title={title} />));
    });

    it("renders passed title", () => {
      expect(queryByText(title)).not.toBeNull();
    });
  });

  describe("when passed left HeaderAction", () => {
    let getByText: GetByAPI["getByText"];
    let onPress: jest.Mock;
    beforeEach(() => {
      onPress = jest.fn();

      ({ queryByText, getByText } = render(
        <Header
          left={{
            onPress,
            view: (
              <View>
                <Text>Back</Text>
              </View>
            )
          }}
        />
      ));
    });

    it("renders view", () => {
      expect(queryByText("Back")).not.toBeNull();
    });

    it("calls onPress on view press", () => {
      const backButton = getByText("Back");
      fireEvent.press(backButton);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
  describe("when passed right HeaderAction", () => {
    let getByText: GetByAPI["getByText"];
    let onPress: jest.Mock;
    beforeEach(() => {
      onPress = jest.fn();

      ({ queryByText, getByText } = render(
        <Header
          right={{
            onPress,
            view: (
              <View>
                <Text>Cancel</Text>
              </View>
            )
          }}
        />
      ));
    });

    it("renders view", () => {
      expect(queryByText("Cancel")).not.toBeNull();
    });

    it("calls onPress on view press", () => {
      const backButton = getByText("Cancel");
      fireEvent.press(backButton);

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
