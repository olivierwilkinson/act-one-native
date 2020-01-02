import "react-native";
import React from "react";
import { render, cleanup, QueryByAPI } from "react-native-testing-library";

import PlaySceneLines from "../PlaySceneLines";
import PlayPositionContext from "../../../contexts/PlayPosition";

import lineRow from "../../../../tests/mocks/lineRow";
import line from "../../../../tests/mocks/line";
import scene from "../../../../tests/mocks/scene";
import play from "../../../../tests/mocks/play";
import { createColourByPlayer } from "../../../helpers/play";

const colourByPlayer = createColourByPlayer(play);

describe("PlaySceneLines", () => {
  let queryByText: QueryByAPI["queryByText"];
  beforeEach(() => {
    ({ queryByText } = render(
      <PlayPositionContext.Provider
        value={{
          activeLine: line,
          activeScene: scene,
          setActiveLineById: () => null
        }}
      >
        <PlaySceneLines {...scene} colourByPlayer={colourByPlayer} />
      </PlayPositionContext.Provider>
    ));
  });
  afterEach(cleanup);

  it("renders line", () => {
    expect(queryByText(lineRow.text)).not.toBeNull();
  });

  it("renders line header", () => {
    expect(queryByText(line.player)).not.toBeNull();
  });
});
