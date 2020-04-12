import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "react-native-reanimated";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import SceneSelectModal from "../SceneSelectModal";

describe("SceneSelectModal", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(() => {
    const SceneSelectModalContainer = createAppContainer(
      createStackNavigator(
        {
          SceneSelectModal: { screen: SceneSelectModal }
        },
        {
          initialRouteName: "SceneSelectModal",
          initialRouteParams: { play }
        }
      )
    );

    ({ queryByText } = render(<SceneSelectModalContainer />));
  });
  afterEach(cleanup);

  it("renders cancel button on header", () => {
    expect(queryByText("Close")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
