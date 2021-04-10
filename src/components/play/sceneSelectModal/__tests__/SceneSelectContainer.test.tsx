import "react-native";
import React from "react";
import { render } from "react-native-testing-library";

import SceneSelectModalContainer, { Props } from "../SceneSelectModalContainer";
import { otherScene, scene } from "../../../../../test/graphql/mocks/scene";
import { line, otherLine } from "../../../../../test/graphql/mocks/line";

const scenes = [
  { ...scene, lines: [{ ...line, lineRows: [] }] },
  { ...otherScene, lines: [{ ...otherLine, lineRows: [] }] }
];

const defaultProps = {
  scenes,
  visible: false,
  onClose: () => {}
};

const mount = (props: Partial<Props> = {}) =>
  render(<SceneSelectModalContainer {...defaultProps} {...props} />);

describe("SceneSelect", () => {
  it("renders title", () => {
    const screen = mount();

    expect(screen.queryByText("Scene Select")).not.toBeNull();
  });

  it("renders play scene list", async () => {
    const screen = mount();

    expect(screen.queryByTestId("play-scene-list")).not.toBeNull();
  });
});
