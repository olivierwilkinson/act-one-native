import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  GetByAPI,
  QueryByAPI
} from "react-native-testing-library";

import PlaySettingsModal, { Props } from "../PlaySettingsModal";
import PlaySettingsContext, {
  PlaySettingsContextValue
} from "../../../contexts/PlaySettings";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";

describe("PlaySettings", () => {
  let defaultProps: Props;
  let settingsContext: PlaySettingsContextValue;
  let getByText: GetByAPI["getByText"];
  let getByTestId: GetByAPI["getByTestId"];
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

    ({ getByText, getByTestId, queryByText } = render(
      <PlaySettingsContext.Provider value={settingsContext}>
        <PlaySettingsModal {...defaultProps} />
      </PlaySettingsContext.Provider>
    ));
  });
  afterEach(cleanup);

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

    it("closes character setting correctly on background press", () => {
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

      it("calls setSettings with selected player", () => {
        fireEvent.press(getByText("Done"));

        expect(settingsContext.setSettings).toHaveBeenCalledWith({
          selectedPlayer: "AEGEON"
        });
      });
    });
  });
});
