import React, { useState, useEffect } from "react";

import { Play as PlayType } from "../../types/play-types";
import PlayPositionContext from "../../contexts/PlayPosition";
import { PlaySettings } from "../../contexts/PlaySettings";
import { findActiveScene } from "../../helpers/play";

type Props = {
  play: PlayType;
  settings: PlaySettings;
  children: JSX.Element;
};

export default ({ play, settings, children }: Props) => {
  const [activeScene, setActiveScene] = useState(
    findActiveScene(play, settings)
  );
  const [activeLine, setActiveLine] = useState(activeScene.lines[0]);

  useEffect(() => {
    const activeScene = findActiveScene(play, settings);

    setActiveScene(activeScene);
    setActiveLine(activeScene.lines[0]);
  }, [settings?.act, settings?.scene]);

  return (
    <PlayPositionContext.Provider
      value={{ activeScene, activeLine, setActiveLine }}
    >
      {children}
    </PlayPositionContext.Provider>
  );
};
