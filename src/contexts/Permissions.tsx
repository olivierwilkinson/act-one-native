import React, {
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useContext
} from "react";
import {
  PermissionType,
  PermissionResponse,
  AUDIO_RECORDING,
  getAsync,
  askAsync
} from "expo-permissions";

import useIsMounted from "../hooks/useIsMounted";

const appPermissions: PermissionType[] = [AUDIO_RECORDING];

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

export interface PermissionsContextValue {
  permissions: PermissionResponse["permissions"];
  requesting: PermissionType[];
  ask: (...types: PermissionType[]) => void;
  get: (...types: PermissionType[]) => void;
}

const PermissionsContext = React.createContext<
  PermissionsContextValue | undefined
>(undefined);

type PermissionsRequest = (
  ...types: PermissionType[]
) => Promise<PermissionResponse>;

type Props = {
  children: ReactNode;
};

export const PermissionsProvider = ({ children }: Props) => {
  const [permissions, setPermissions] = useState({});
  const [requesting, setRequesting] = useState<PermissionType[]>([]);
  const isMounted = useIsMounted();

  const requestPermissions = useCallback(
    (fn: PermissionsRequest, types: PermissionType[]) => {
      setRequesting(types);

      fn(...types)
        .then(res => {
          if (isMounted.current) {
            setPermissions(res.permissions);
            setRequesting(requesting.filter(type => types.includes(type)));
          }
        })
        .catch(() => {
          if (!isMounted.current) {
            setRequesting(requesting.filter(type => types.includes(type)));
          }
        });
    },
    [setPermissions, setRequesting]
  );

  const ask = useCallback(
    (...types: PermissionType[]) => requestPermissions(askAsync, types),
    [requestPermissions, askAsync]
  );

  const get = useCallback(
    (...types: PermissionType[]) => requestPermissions(getAsync, types),
    [requestPermissions, getAsync]
  );

  useEffect(() => {
    get(...appPermissions);
  }, []);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        requesting,
        ask,
        get
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const permissions = useContext(PermissionsContext);
  if (!permissions) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }

  return permissions;
};
