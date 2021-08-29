import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

// Param Lists
export type MainStackParamList = {
  Tabs: undefined;
  Play: { playId: number; showSettings?: boolean };
};

export type BottomTabStackParamList = {
  Home: undefined;
  Profile: undefined;
};

// Main Stack Navigation Props
export type MainStackNavigationProp = StackNavigationProp<MainStackParamList>;
export type TabsNavigationProp = StackNavigationProp<
  MainStackParamList,
  "Tabs"
>;
export type PlayNavigationProp = StackNavigationProp<
  MainStackParamList,
  "Play"
>;

// Bottom Tab Stack Navigation Props
export type BottomTabStackNavigationProp = BottomTabNavigationProp<
  BottomTabStackParamList
>;
export type HomeNavigationProp = BottomTabNavigationProp<
  BottomTabStackParamList,
  "Home"
>;
export type ProfileNavigationProp = BottomTabNavigationProp<
  BottomTabStackParamList,
  "Profile"
>;

// Route Props
export type BottomTabRouteProp = RouteProp<MainStackParamList, "Tabs">;
export type PlayRouteProp = RouteProp<MainStackParamList, "Play">;
