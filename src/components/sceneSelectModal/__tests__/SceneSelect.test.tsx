import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import "jest-styled-components/native";

import SceneSelect from "../SceneSelect";
import play from "../../../data/plays/shakespeare/AComedyOfErrors";

describe("SceneSelect", () => {
  let onScenePress: jest.Mock;
  let queryByText: QueryByAPI["queryByText"];
  let queryByTestId: QueryByAPI["queryByTestId"];
  beforeEach(async () => {
    onScenePress = jest.fn();

    ({ queryByText, queryByTestId } = render(
      <SceneSelect play={play} settings={{}} onScenePress={onScenePress} />
    ));
  });
  afterEach(cleanup);

  it("renders title", () => {
    expect(queryByText("Scene Select")).not.toBeNull();
  });

  it("renders play scene list", async () => {
    expect(queryByTestId("play-scene-list")).not.toBeNull();
  });
});
