import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import { Picker } from "@react-native-community/picker";

import PlaySettingsModal, { Props } from "../PlaySettingsModal";
import { otherScene, scene } from "../../../../../test/graphql/mocks/scene";
import { line, otherLine } from "../../../../../test/graphql/mocks/line";

const scenes = [
  { ...scene, lines: [{ ...line, lineRows: [] }] },
  { ...otherScene, lines: [{ ...otherLine, lineRows: [] }] }
];

const defaultProps = {
  scenes,
  visible: true,
  onClose: () => {},
  onPlayerSelected: () => {}
};

const mount = (props: Partial<Props> = {}) =>
  render(<PlaySettingsModal {...defaultProps} {...props} />);

describe("PlaySettings", () => {
  it("renders close button on header", () => {
    const screen = mount();

    expect(screen.queryByText("Close")).not.toBeNull();
  });

  it("renders title", () => {
    const screen = mount();

    expect(screen.queryByText("Play Settings")).not.toBeNull();
  });

  it("renders character setting", () => {
    const screen = mount();

    expect(screen.queryByText("Character")).not.toBeNull();
  });

  it("renders selected character in settings value", () => {
    const screen = mount({ selectedPlayer: "Captain Hindsight" });

    expect(screen.getByText("Captain Hindsight")).not.toBeNull();
  });

  it("renders character list when character setting pressed", () => {
    const screen = mount();

    fireEvent.press(screen.getByText("Character"));
    const characterSelectPicker = screen.UNSAFE_getByType(Picker);
    const characters = characterSelectPicker.props.children.map(
      ({ key }: any) => key
    );

    expect(characters).toEqual(["Hamlet", "Captain Hindsight"]);
  });

  // this needs to be in a different place
  it.todo(
    "calls setSettings with selected player when a new character is selected"
  );
});
