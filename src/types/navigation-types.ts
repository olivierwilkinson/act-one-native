import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { Play } from "./play-types";

// Param Lists
export type MainStackParamList = {
  Home: undefined;
  Play: { play: Play };
};

// Navigation Props
export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;
export type HomeNavigationProp = StackNavigationProp<
  MainStackParamList,
  "Home"
>;
export type PlayNavigationProp = StackNavigationProp<
  MainStackParamList,
  "Play"
>;

// Route Props
export type HomeRouteProp = RouteProp<MainStackParamList, "Home">;
export type PlayRouteProp = RouteProp<MainStackParamList, "Play">;