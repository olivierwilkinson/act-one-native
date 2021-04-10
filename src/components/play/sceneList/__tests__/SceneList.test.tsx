import "react-native";
import React from "react";
import { render } from "react-native-testing-library";

import SceneList, { Props } from "../SceneList";
import { play } from "../../../../../test/graphql/mocks/play";
import { otherScene, scene } from "../../../../../test/graphql/mocks/scene";
import { line, otherLine } from "../../../../../test/graphql/mocks/line";

const scenes = [
  { ...scene, lines: [{ ...line, lineRows: [] }] },
  { ...otherScene, lines: [{ ...otherLine, lineRows: [] }] }
];

const defaultProps = {
  ...play,
  scenes,
  activeScene: scenes[0],
  onScenePress: () => {}
};

const mount = (props: Partial<Props> = {}) =>
  render(<SceneList {...defaultProps} {...props} />);

describe("SceneList", () => {
  it("renders act header", () => {
    const screen = mount();

    expect(screen.queryByText("ACT 1")).not.toBeNull();
  });

  it("renders scene row correctly", async () => {
    const screen = mount();

    expect(screen.queryByTestId("scene-row-1-1")).not.toBeNull();
  });

  it("renders current scene indicator", () => {
    const screen = mount();

    expect(screen.queryByTestId("current-scene-indicator-1-1")).not.toBeNull();
  });

  it("renders right arrow", () => {
    const screen = mount();

    expect(screen.queryByTestId("right-arrow-1-1"));
  });

  it("sets indicator visible when on current scene", () => {
    const screen = mount();

    const indicator = screen.getByTestId(`current-scene-indicator-1-1`);
    expect(indicator.props.visible).toEqual(true);
  });

  it("sets indicator invisible when not on current scene", () => {
    const screen = mount();

    const indicator = screen.getByTestId(
      `current-scene-indicator-${otherScene.actNum}-${otherScene.sceneNum}`
    );
    expect(indicator.props.visible).toEqual(false);
  });
});
