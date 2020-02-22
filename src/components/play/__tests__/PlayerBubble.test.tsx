import "react-native";
import React from "react";
import { render, cleanup, RenderAPI } from "react-native-testing-library";

import PlayerBubble, { Props } from "../PlayerBubble";

describe("PlayerBubble", () => {
  let defaultProps: Props;
  let toJSON: RenderAPI["toJSON"];
  let rerender: RenderAPI["rerender"];
  beforeEach(() => {
    defaultProps = {
      player: "Professor Poopy Pants",
      colour: {
        red: 255,
        green: 255,
        blue: 255
      },
      highlighted: false,
      style: { backgroundColor: "papayawhip" }
    };

    ({ toJSON, rerender } = render(<PlayerBubble {...defaultProps} />));
  });
  afterEach(cleanup);

  it("renders correctly", () => {
    expect(toJSON()).toMatchSnapshot();
  });

  describe("when highlighted is true", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        highlighted: true
      };

      rerender(<PlayerBubble {...defaultProps} />);
    });

    it("renders correctly", () => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe("when isSelected is true", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        isSelected: true
      };

      rerender(<PlayerBubble {...defaultProps} />);
    });

    it("renders correctly", () => {
      expect(toJSON()).toMatchSnapshot();
    });

    describe("when highlighted is true", () => {
      beforeEach(() => {
        defaultProps = {
          ...defaultProps,
          highlighted: true
        };

        rerender(<PlayerBubble {...defaultProps} />);
      });

      it("renders correctly", () => {
        expect(toJSON()).toMatchSnapshot();
      });
    });
  });
});
