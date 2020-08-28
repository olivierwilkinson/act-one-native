import "react-native";
import React from "react";
import { render, QueryByAPI } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import plays from "../../data/plays";
import Home from "../HomeScreen";
import Header from "../../components/common/header/Header";

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
            options={{
              header: () => <Header />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    ));
  });

  it("renders default title", () => {
    expect(queryByText("ActOne")).not.toBeNull();
  });

  plays.forEach(play => {
    it(`renders ${play.play} list item`, () => {
      expect(queryByText(play.play)).not.toBeNull();
    });

    it(`renders ${play.play} description`, () => {
      expect(queryByText(play.description)).not.toBeNull();
    });
  });
});
