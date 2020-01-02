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

import line from "../../../../tests/mocks/line";
import scene from "../../../../tests/mocks/scene";
import play from "../../../../tests/mocks/play";
import { createColourByPlayer } from "../../../helpers/play";

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
            {...line}
            player=""
            colour={colourByPlayer[line.player]}
          />
        </PlayPositionContext.Provider>
      ));

      it("does not render player bubble", () => {
        expect(queryByTestId("player-bubble")).toBeNull();
      });
    });
  });
});
