import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI
} from "react-native-testing-library";

import PlayLineHeader from "../PlayLineHeader";
import PlayPositionContext from "../../../contexts/PlayPosition";
import { createColourByPlayer } from "../../../helpers/play";
import {
  findPlayerLine,
  findDirectionLine
} from "../../../../tests/helpers/play-mock-helpers";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [scene]
} = play;
const line = findPlayerLine(scene);
const noPlayerLine = findDirectionLine(scene);

const colourByPlayer = createColourByPlayer(play);

describe("PlayLineHeader", () => {
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
        <PlayLineHeader {...line} colour={colourByPlayer[line.player]} />
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
          <PlayLineHeader
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
