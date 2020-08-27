import React from "react";
import { Text } from "react-native";

export type Props = {
  name: string;
};

export default ({ name }: Props) => <Text>{name}</Text>;
