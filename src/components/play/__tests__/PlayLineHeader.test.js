import "react-native";
import React from "react";
import { render, fireEvent, cleanup } from "react-native-testing-library";

import PlayLineHeader from "../PlayLineHeader";
import PlayPositionContext from "../../../contexts/PlayPosition";

import line from "../../../../tests/mocks/line";
import scene from "../../../../tests/mocks/scene";

describe("PlayLineHeader", () => {
  let queryByTestId;
  let setActiveLineById;
  beforeEach(() => {
    setActiveLineById = jest.fn();

    ({ queryByTestId, queryByText } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLineById
        }}
      >
        <PlayLineHeader {...line} />
      </PlayPositionContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("sets active line on press", () => {
    const playLine = queryByTestId("play-line-header");
    fireEvent.press(playLine);

    expect(setActiveLineById).toHaveBeenCalledWith(line.id);
  });

  it("renders player bubble", () => {
    expect(queryByTestId("player-bubble")).not.toBeNull();
  });

  describe("when line has no player", () => {
    beforeEach(() => {
      ({ queryByType, queryByText } = render(
        <PlayPositionContext.Provider
          value={{
            activeLine: line,
            activeScene: scene,
            setActiveLineById
          }}
        >
          <PlayLineHeader {...line} player="" />
        </PlayPositionContext.Provider>
      ));

      it("does not render player bubble", () => {
        expect(queryByTestId("player-bubble")).toBeNull();
      });
    });
  });
});
