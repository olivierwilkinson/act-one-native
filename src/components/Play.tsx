import React, { useState, useRef } from "react";
import { SectionList } from "react-native";
import palette from "google-palette";
import convert from "color-convert";

import PlayScene from "./PlayScene";
import PlaySceneHeader from "./PlaySceneHeader";
import { Play } from "../types/play-types";

const generateColourPalette = (play: Play) => {
  const players = Array.from(
    new Set(
      [].concat(
        ...play.script.map(({ lines }) => lines.map(line => line.player))
      )
    )
  );
  const colours = palette("tol-rainbow", players.length);

  return players.reduce(
    (colourByPlayer, player, colourIndex) => ({
      ...colourByPlayer,
      [player]: convert.hex.rgb(colours[colourIndex])
    }),
    {}
  );
};

export default (play: Play) => {
  const [colourByPlayer] = useState(generateColourPalette(play));

  return (
    <SectionList
      initialNumToRender={play.script.length}
      sections={play.script.map(scene => ({ data: [scene] }))}
      renderItem={({ item: scene }) => (
        <PlayScene {...scene} colourByPlayer={colourByPlayer} />
      )}
      renderSectionHeader={({
        section: {
          data: [scene]
        }
      }) => <PlaySceneHeader {...scene} />}
      keyExtractor={item => `${item.act}-${item.scene}`}
      stickySectionHeadersEnabled
    />
  );
};
