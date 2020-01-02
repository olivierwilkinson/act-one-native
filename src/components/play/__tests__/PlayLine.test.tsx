import "react-native";
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  GetByAPI
} from "react-native-testing-library";

import PlayLine from "../PlayLine";
import PlayPositionContext from "../../../contexts/PlayPosition";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
const {
  scenes: [scene]
} = play;
const {
  lines: [activeLine, otherLine]
} = scene;

describe("PlayLine", () => {
  let getByTestId: GetByAPI["getByTestId"];
  let setActiveLineById: jest.Mock;
  beforeEach(() => {
    setActiveLineById = jest.fn();

    ({ getByTestId } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine,
          activeScene: scene,
          setActiveLineById
        }}
      >
        <PlayLine {...activeLine} />
      </PlayPositionContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("sets active line on press", () => {
    const playLine = getByTestId("play-line");
    fireEvent.press(playLine);

    expect(setActiveLineById).toHaveBeenCalledWith(activeLine.id);
  });

  it("sets highlighted style when line is active", () => {
    const {
      props: { highlighted }
    } = getByTestId("play-line-view");
    expect(highlighted).toEqual(true);
  });

  describe("when line is not the active line", () => {
    beforeEach(() => {
      ({ getByTestId } = render(
        <PlayPositionContext.Provider
          value={{
            activeLine,
            activeScene: scene,
            setActiveLineById
          }}
        >
          <PlayLine {...otherLine} />
        </PlayPositionContext.Provider>
      ));
    });

    it("sets highlighted style when line is active", () => {
      const {
        props: { highlighted }
      } = getByTestId("play-line-view");
      expect(highlighted).toEqual(false);
    });
  });
});
