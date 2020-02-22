import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  GetByAPI,
  QueryByAPI
} from "react-native-testing-library";

import PlaySettings, { Props } from "../PlaySettings";

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
      it.skip("sets character setting value to selected character on done", () => {
        expect(defaultProps.onSettingsUpdate).toHaveBeenCalledWith({
          selectedPlayer: "new player"
        });
      });
    });
  });
});
