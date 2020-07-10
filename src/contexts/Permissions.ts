import React from "react";
import { PermissionResponse, PermissionType } from "expo-permissions";

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

export interface AudioContextValue {
  permissions: PermissionResponse["permissions"];
  requesting: PermissionType[];
  ask: (...types: PermissionType[]) => void;
  get: (...types: PermissionType[]) => void;
}

export default React.createContext<AudioContextValue>({
  permissions: {},
  requesting: [],
  ask: () => null,
  get: () => null
});
