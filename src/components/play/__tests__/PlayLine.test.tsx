import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  QueryByAPI
} from "react-native-testing-library";

import PlayLine from "../PlayLine";
import PlayPositionContext from "../../../contexts/PlayPosition";

import line from "../../../../tests/mocks/line";
import scene from "../../../../tests/mocks/scene";

describe("PlayLine", () => {
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
        <PlayLine {...line} />
      </PlayPositionContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("sets active line on press", () => {
    const playLine = queryByTestId("play-line");
    fireEvent.press(playLine);

    expect(setActiveLineById).toHaveBeenCalledWith(line.id);
  });
});
