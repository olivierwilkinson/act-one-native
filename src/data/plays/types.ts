import { PlayData } from "../../types/graphql-types";

export type LocalPlayData = Omit<PlayData, "image"> & {
  image: number;
};
