import "react-native";
import React from "react";
import { render, QueryByAPI } from "react-native-testing-library";
import "jest-styled-components/native";

import SceneSelectModal, { Props } from "../SceneSelectModal";
import play from "../../../../data/plays/shakespeare/AComedyOfErrors";

describe("SceneSelect", () => {
  let defaultProps: Props;
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  beforeEach(async () => {
    defaultProps = {
      play,
      visible: false,
      onClose: jest.fn()
    };

    ({ queryByText, queryByTestId } = render(
      <SceneSelectModal {...defaultProps} />
    ));
  });

  it("renders title", () => {
    expect(queryByText("Scene Select")).not.toBeNull();
  });

  it("renders play scene list", async () => {
    expect(queryByTestId("play-scene-list")).not.toBeNull();
  });
});
