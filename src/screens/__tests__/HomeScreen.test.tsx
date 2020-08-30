import "react-native";
import React from "react";
import { render, waitFor } from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import plays from "../../data/plays";
import Home from "../HomeScreen";
import Header from "../../components/common/header/Header";
import AppProviders from "../../components/app/appProviders/AppProviders";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

const mount = () => {
  const Stack = createStackNavigator();
  return render(
    <AppProviders>
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
    </AppProviders>
  );
};

describe("HomeScreen", () => {
  it("renders default title", async () => {
    const { queryByText } = mount();
    await waitFor(() => expect(queryByText("ActOne")).not.toBeNull());
  });

  plays.forEach(play => {
    it(`renders ${play.title} list item`, async () => {
      const { queryByText } = mount();
      await waitFor(() => expect(queryByText(play.title)).not.toBeNull());
    });

    it(`renders ${play.title} description`, async () => {
      const { queryByText } = mount();
      await waitFor(() => expect(queryByText(play.description)).not.toBeNull());
    });
  });
});
