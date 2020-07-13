import React from "react";
import {
  render,
  fireEvent,
  GetByAPI,
  QueryByAPI
} from "react-native-testing-library";

import PlaySettingsModal, { Props } from "../PlaySettingsModal";
import PlaySettingsContext, {
  PlaySettingsContextValue
} from "../../../../contexts/PlaySettings";

import play from "../../../../data/plays/shakespeare/AComedyOfErrors";
import { Picker } from "react-native";

describe("PlaySettings", () => {
  let defaultProps: Props;
  let settingsContext: PlaySettingsContextValue;
  let getByText: GetByAPI["getByText"];
  let getByType: GetByAPI["UNSAFE_getByType"];
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    defaultProps = {
      play,
      visible: false,
      onClose: jest.fn()
    };
    settingsContext = {
      settings: { selectedPlayer: "captain hindsight" },
      setSettings: jest.fn(),
      openSettings: jest.fn()
    };

    ({ getByText, UNSAFE_getByType: getByType, queryByText } = render(
      <PlaySettingsContext.Provider value={settingsContext}>
        <PlaySettingsModal {...defaultProps} />
      </PlaySettingsContext.Provider>
    ));
  });

  it("renders close button on header", () => {
    expect(queryByText("Close")).not.toBeNull();
  });

  it("renders title", () => {
    expect(queryByText("Play Settings")).not.toBeNull();
  });

  it("renders character setting", () => {
    expect(queryByText("Character")).not.toBeNull();
  });

  it("renders selected character in settings value", () => {
    expect(
      queryByText(settingsContext.settings.selectedPlayer!)
    ).not.toBeNull();
  });

  describe("on character setting press", () => {
    beforeEach(() => {
      fireEvent.press(getByText("Character"));
    });

    describe("when new character is selected", () => {
      beforeEach(() => {
        fireEvent(getByType(Picker), "onValueChange", "AEGEON");
      });

      it("calls setSettings with selected player", () => {
        fireEvent.press(getByText("Done"));

        expect(settingsContext.setSettings).toHaveBeenCalledWith({
          selectedPlayer: "AEGEON"
        });
      });
    });
  });
});
