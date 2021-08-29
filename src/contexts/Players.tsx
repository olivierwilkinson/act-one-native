import { useQuery } from "@apollo/client";
import React, { useContext, useMemo } from "react";

import { GetPlay, GetPlayVariables } from "../graphql/queries/types/GetPlay";
import GET_PLAY from "../graphql/queries/GetPlay.graphql";

import { createColourByPlayer, findPlayers } from "../helpers/play";

export type RGBColour = {
  red: number;
  green: number;
  blue: number;
};

export type PlayersContextValue = {
  players: string[];
  colourByPlayer: { [player: string]: RGBColour };
};

const PlayersContext = React.createContext<PlayersContextValue | undefined>(
  undefined
);

type Props = {
  playId: number;
  children: JSX.Element;
};

export const PlayersProvider = ({ playId, children }: Props) => {
  const { data: { play } = {} } = useQuery<GetPlay, GetPlayVariables>(
    GET_PLAY,
    {
      variables: { where: { id: playId } }
    }
  );

  const players = useMemo(() => findPlayers(play?.scenes || []).sort(), [play]);
  const colourByPlayer = useMemo(() => createColourByPlayer(players), [
    players
  ]);

  const value = useMemo(
    () => ({
      players,
      colourByPlayer
    }),
    [players, colourByPlayer]
  );

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const players = useContext(PlayersContext);
  if (!players) {
    throw new Error("usePlayers must be used within an PlayersProvider");
  }

  return players;
};
