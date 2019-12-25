import React, { useState, useCallback } from "react";
import { SectionList } from "react-native";
import palette from "google-palette";
import convert from "color-convert";

import PlayLine from "./PlayLine";
import PlayLineHeader from "./PlayLineHeader";
import { Play, Line } from "../types/play-types";

const generateColourPalette = (play: Play) => {
  const players = Array.from(new Set(play.script.map(({ player }) => player)));
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
      sections={play.script.map((line: Line) => ({
        data: [line],
        title: line.player
      }))}
      renderItem={({ item }) => <PlayLine {...item} />}
      renderSectionHeader={({ section: { title: player } }) => (
        <PlayLineHeader player={player} colour={colourByPlayer[player]} />
      )}
      keyExtractor={item => item.id.toString()}
      stickySectionHeadersEnabled
    />
  );
};
