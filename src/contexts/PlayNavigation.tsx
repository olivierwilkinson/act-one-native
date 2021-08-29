import React, { useState, useEffect, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { usePlaySettings } from "./PlaySettings";
import { findActiveScene } from "../helpers/play";

import { GetPlay } from "../graphql/queries/types/GetPlay";
import GET_PLAY from "../graphql/queries/GetPlay.graphql";

import SceneSelectModalContainer from "../components/play/sceneSelectModal/SceneSelectModalContainer";
export interface PlayNavigation {
  goToNextScene?: () => void;
  goToPreviousScene?: () => void;
  openSceneSelect: () => void;
}

const PlayNavigationContext = React.createContext<PlayNavigation | undefined>(
  undefined
);

type Props = {
  playId: number;
  children: JSX.Element;
};

export const PlayNavigationProvider = ({ playId, children }: Props) => {
  const { settings, setSettings } = usePlaySettings();

  const { data: { play } = {} } = useQuery<GetPlay>(GET_PLAY, {
    variables: { where: { id: playId } },
    skip: !playId
  });

  const [sceneSelectActive, setSceneSelectActive] = useState(false);

  const playNavigation = useMemo(() => {
    if (!play) return { openSceneSelect: () => setSceneSelectActive(true) };

    const scenes = [...play.scenes].sort((a, b) => a.index - b.index);
    const activeScene = findActiveScene(play.scenes, settings);
    const sceneIndex = activeScene ? scenes.indexOf(activeScene) : -1;

    const nextScene = scenes[sceneIndex + 1];
    const previousScene = scenes[sceneIndex - 1];

    const goToNextScene =
      nextScene &&
      (() =>
        setSettings({
          actNum: nextScene.actNum,
          sceneNum: nextScene.sceneNum
        }));

    const goToPreviousScene =
      previousScene &&
      (() =>
        setSettings({
          actNum: previousScene.actNum,
          sceneNum: previousScene.sceneNum
        }));

    return {
      goToNextScene,
      goToPreviousScene,
      openSceneSelect: () => setSceneSelectActive(true)
    };
  }, [play, settings]);

  useEffect(() => {
    if (settings) {
      setSceneSelectActive(false);
    }
  }, [settings]);

  return (
    <>
      <PlayNavigationContext.Provider value={playNavigation}>
        {children}
      </PlayNavigationContext.Provider>

      <SceneSelectModalContainer
        scenes={[...(play?.scenes || [])].sort((a, b) => a.index - b.index)}
        visible={sceneSelectActive}
        onClose={() => setSceneSelectActive(false)}
      />
    </>
  );
};

export const usePlayNavigation = () => {
  const playNavigation = useContext(PlayNavigationContext);
  if (!playNavigation) {
    throw new Error(
      "usePlayNavigation must be used within a PlayNavigationProvider"
    );
  }

  return playNavigation;
};
