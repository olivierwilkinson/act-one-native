import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI
} from "react-native-testing-library";

import LineHeader from "../LineHeader";
import PlayPositionContext from "../../../contexts/PlayPosition";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { Line } from "../../../types/play-types";
const {
  scenes: [scene]
} = play;
const line = scene.lines.find(({ player }) => player) as Line;
const noPlayerLine = scene.lines.find(({ player }) => !player) as Line;
const { colourByPlayer } = play;

describe("LineHeader", () => {
  let queryByTestId: QueryByAPI["queryByTestId"];
  let setActiveLineById: jest.Mock;
  beforeEach(() => {
    setActiveLineById = jest.fn();

    ({ queryByTestId } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLineById
        }}
      >
        <LineHeader {...line} colour={colourByPlayer[line.player]} />
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
      ({ queryByTestId } = render(
        <PlayPositionContext.Provider
          value={{
            activeLine: line,
            activeScene: scene,
            setActiveLineById
          }}
        >
          <LineHeader
            {...noPlayerLine}
            colour={colourByPlayer[noPlayerLine.player]}
          />
        </PlayPositionContext.Provider>
      ));

      it("does not render player bubble", () => {
        expect(queryByTestId("player-bubble")).toBeNull();
      });
    });
  });
});
