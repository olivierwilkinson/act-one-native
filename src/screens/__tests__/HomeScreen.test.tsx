import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-reanimated";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import Home from "../HomeScreen";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("HomeScreen", () => {
  let queryByText: QueryByAPI["queryByText"];

  beforeEach(() => {
    const Stack = createStackNavigator();

    ({ queryByText } = render(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={Home.navigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    ));
  });
  afterEach(cleanup);

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  it("renders play list", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });
});
