import React, { useState, useEffect, useContext } from "react";

import { Play as PlayType } from "../../../types/play-types";
import PlayPositionContext from "../../../contexts/PlayPosition";
import PlaySettingsContext from "../../../contexts/PlaySettings";
import { findActiveScene } from "../../../helpers/play";

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
    const { actNum: prevActNum, sceneNum: prevSceneNum } = activeScene;
    const { actNum, sceneNum } = settings || {};
    if (actNum === prevActNum && sceneNum === prevSceneNum) {
      return;
    }

    const newActiveScene = findActiveScene(play, settings);
    const newActiveLine = newActiveScene.lines[0];

    setActiveScene(newActiveScene);
    setActiveLine(newActiveLine);
  }, [settings?.actNum, settings?.sceneNum]);

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
