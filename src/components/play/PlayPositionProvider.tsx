import React, { useState, useEffect, useContext } from "react";

import { Play as PlayType } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import PlaySettingsContext from "../../contexts/PlaySettings";
import { findActiveScene } from "../../helpers/play";

type Props = {
  play: PlayType;
  children: JSX.Element;
};

const PlayPositionProvider = ({ play, children }: Props) => {
  const { settings } = useContext(PlaySettingsContext);
  const [activeScene, setActiveScene] = useState(
    findActiveScene(play, settings)
  );
  const [activeLine, setActiveLine] = useState(activeScene.lines[0]);

  useEffect(() => {
    const { act: prevAct, scene: prevScene } = activeScene;
    const { act, scene } = settings || {};
    if (act === prevAct && scene === prevScene) {
      return;
    }

    const newActiveScene = findActiveScene(play, settings);
    const newActiveLine = newActiveScene.lines[0];

    setActiveScene(newActiveScene);
    setActiveLine(newActiveLine);
  }, [settings?.act, settings?.scene]);

  return (
    <PlayPositionContext.Provider
      value={{
        activeScene,
        activeLine,
        setActiveLine
      }}
    >
      {children}
    </PlayPositionContext.Provider>
  );
};

export default PlayPositionProvider;
