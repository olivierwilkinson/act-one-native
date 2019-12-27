import React, { useState, useRef } from "react";
import { SectionList } from "react-native";
import palette from "google-palette";
import convert from "color-convert";
import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

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

const getItemLayout = sectionListGetItemLayout({
  getItemHeight: (scene, sectionIndex, rowIndex) => {
    const totalLines = scene.lines.length;
    const totalLineRows = scene.lines.reduce(
      (total, line) => total + line.lineRows.length,
      0
    );

    const lineMarginContribution = totalLines * 20;
    const lineRowMarginContribution = totalLineRows * 6;
    const lineRowContentContribution = totalLineRows * 16;
    return (
      lineMarginContribution +
      lineRowMarginContribution +
      lineRowContentContribution
    );
  },
  getSectionHeaderHeight: () => 20 // The height of your section headers
});

export default (play: Play) => {
  const [colourByPlayer] = useState(generateColourPalette(play));
  const list = useRef(null);

  if (play.currentAct && play.currentScene && list && list.current) {
    const sectionIndex = play.script.findIndex(
      scene =>
        scene.scene === play.currentScene && scene.act === play.currentAct
    );

    if (sectionIndex) {
      list.current.scrollToLocation({
        animated: false,
        sectionIndex,
        itemIndex: 0
      });
    }
  }

  return (
    <SectionList
      ref={list}
      getItemLayout={getItemLayout}
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
