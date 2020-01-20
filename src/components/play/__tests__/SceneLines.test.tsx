import "react-native";
import React from "react";
import {
  render,
  cleanup,
  QueryByAPI,
  GetByAPI
} from "react-native-testing-library";

import SceneLines from "../SceneLines";
import PlayPositionContext from "../../../contexts/PlayPosition";

import play from "../../../data/plays/shakespeare/AComedyOfErrors";
import { Line } from "../../../types/play-types";
const {
  scenes: [scene]
} = play;
const line = scene.lines.find(({ player }) => player) as Line;
const {
  lineRows: [lineRow]
} = line;
const { colourByPlayer } = play;

describe("SceneLines", () => {
  let queryByText: QueryByAPI["queryByText"];
  let getAllByText: GetByAPI["getAllByText"];
  beforeEach(() => {
    ({ queryByText, getAllByText } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLineById: () => null
        }}
      >
        <SceneLines {...scene} colourByPlayer={colourByPlayer} />
      </PlayPositionContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("renders line", () => {
    expect(queryByText(lineRow.text)).not.toBeNull();
  });

  it("renders line header", () => {
    const headers = getAllByText(line.player);

    expect(headers.length).toBeTruthy();
  });
});
