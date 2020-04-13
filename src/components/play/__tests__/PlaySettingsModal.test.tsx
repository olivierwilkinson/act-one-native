import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  GetByAPI,
  QueryByAPI
} from "react-native-testing-library";

import PlaySettings, { Props } from "../PlaySettingsModal";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";

jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});

describe("PlaySettings", () => {
  let defaultProps: Props;
  let getByText: GetByAPI["getByText"];
  let getByTestId: GetByAPI["getByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    defaultProps = {
      scenes: play.scenes,
      settings: { selectedPlayer: "captain hindsight" },
      onSettingsUpdate: jest.fn()
    };

    ({ getByText, getByTestId, queryByText } = render(
      <PlaySettings {...defaultProps} />
    ));
  });
  afterEach(cleanup);

  it("renders title", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders character setting", () => {
    expect(queryByText("Character")).not.toBeNull();
  });

  it("renders selected character in settings value", () => {
    expect(queryByText(defaultProps.settings.selectedPlayer!)).not.toBeNull();
  });

  it("does not render character select action sheet by default", () => {
    const background = getByTestId("custom-action-sheet-background");
    const modal = background.parent;
    expect(modal.props.visible).toEqual(false);
  });

  describe("on character setting press", () => {
    beforeEach(() => {
      fireEvent.press(getByText("Character"));
    });

    it("opens character select action sheet on character setting press", () => {
      const background = getByTestId("custom-action-sheet-background");
      const modal = background.parent;
      expect(modal.props.visible).toEqual(true);
    });

    it("closes character setting correctly", () => {
      const background = getByTestId("custom-action-sheet-background");
      fireEvent.press(background);

      const modal = background.parent;
      expect(modal.props.visible).toEqual(false);
    });

    describe("when new character is selected", () => {
      beforeEach(() => {
        fireEvent(
          getByTestId("action-sheet-picker"),
          "onValueChange",
          "AEGEON"
        );
      });

      it("sets character setting value to selected character on done", () => {
        fireEvent.press(getByText("Done"));

        expect(defaultProps.onSettingsUpdate).toHaveBeenCalledWith({
          selectedPlayer: "AEGEON"
        });
      });
    });
  });
});

import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  GetByAPI,
  fireEvent
} from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-reanimated";
import "react-gateway";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlaySettingsModal from "../PlaySettingsModal";
import { setParams, playScreenKey } from "../../helpers/navigation";
import { PlaySettings } from "../../contexts/PlaySettings";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});
jest.mock("../../helpers/navigation", () => ({
  setParams: jest.fn(),
  playScreenKey: "play-screen-key"
}));

const mockedSetParams = setParams as jest.Mock;

describe("PlaySettingsModal", () => {
  let getByTestId: GetByAPI["getByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  let settings: PlaySettings;

  beforeEach(() => {
    settings = { selectedPlayer: "AEGEON" };

    const Stack = createStackNavigator();

    ({ getByTestId, queryByText } = render(
      <NavigationContainer
        ref={(nav: any) => {
          if (nav) {
            navigator = nav.current;
          }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="PlaySettings" component={PlaySettingsModal} />
        </Stack.Navigator>
      </NavigationContainer>
    ));
  });
  afterEach(() => {
    mockedSetParams.mockRestore();
    cleanup();
  });

  it("renders close button on header", () => {
    expect(queryByText("Close")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("renders play settings", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders selected player correctly", () => {
    expect(queryByText("AEGEON")).not.toBeNull();
  });

  describe("when new player selected", () => {
    beforeEach(() => {
      fireEvent(getByTestId("action-sheet-picker"), "onValueChange", "Gaoler");

      fireEvent.press(getByTestId("custom-action-sheet-done-button"));
    });

    it("calls setParams correctly on settings update", () => {
      expect(mockedSetParams).toHaveBeenCalledTimes(1);
      expect(mockedSetParams.mock.calls[0][1]).toEqual(playScreenKey);
      expect(mockedSetParams.mock.calls[0][2]).toEqual({
        play,
        settings: {
          ...settings,
          selectedPlayer: "Gaoler"
        }
      });
    });
  });
});


import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  GetByAPI,
  fireEvent
} from "react-native-testing-library";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-reanimated";
import "react-gateway";

import play from "../../data/plays/shakespeare/AComedyOfErrors";
import PlaySettingsModal from "../PlaySettingsModal";
import { setParams, playScreenKey } from "../../helpers/navigation";
import { PlaySettings } from "../../contexts/PlaySettings";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-gateway", () => {
  const React = require("React");
  return {
    Gateway: ({ children, ...props }: { children: JSX.Element }) =>
      React.createElement("View", props, children),
    GatwayDest: () => "View"
  };
});
jest.mock("../../helpers/navigation", () => ({
  setParams: jest.fn(),
  playScreenKey: "play-screen-key"
}));

const mockedSetParams = setParams as jest.Mock;

describe("PlaySettingsModal", () => {
  let getByTestId: GetByAPI["getByTestId"];
  let queryByText: QueryByAPI["queryByText"];
  let settings: PlaySettings;

  beforeEach(() => {
    settings = { selectedPlayer: "AEGEON" };

    const Stack = createStackNavigator();

    ({ getByTestId, queryByText } = render(
      <NavigationContainer
        ref={(nav: any) => {
          if (nav) {
            navigator = nav.current;
          }
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="PlaySettings" component={PlaySettingsModal} />
        </Stack.Navigator>
      </NavigationContainer>
    ));
  });
  afterEach(() => {
    mockedSetParams.mockRestore();
    cleanup();
  });

  it("renders close button on header", () => {
    expect(queryByText("Close")).not.toBeNull();
  });

  it("renders correct header title", () => {
    expect(queryByText(play.play)).not.toBeNull();
  });

  it("renders play settings", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders selected player correctly", () => {
    expect(queryByText("AEGEON")).not.toBeNull();
  });

  describe("when new player selected", () => {
    beforeEach(() => {
      fireEvent(getByTestId("action-sheet-picker"), "onValueChange", "Gaoler");

      fireEvent.press(getByTestId("custom-action-sheet-done-button"));
    });

    it("calls setParams correctly on settings update", () => {
      expect(mockedSetParams).toHaveBeenCalledTimes(1);
      expect(mockedSetParams.mock.calls[0][1]).toEqual(playScreenKey);
      expect(mockedSetParams.mock.calls[0][2]).toEqual({
        play,
        settings: {
          ...settings,
          selectedPlayer: "Gaoler"
        }
      });
    });
  });
});
