import React, { useState, ReactNode, useEffect, useCallback } from "react";
import {
  PermissionType,
  PermissionResponse,
  getAsync,
  askAsync
} from "expo-permissions";

import PermissionsContext from "../../contexts/Permissions";

type PermissionsRequest = (
  ...types: PermissionType[]
) => Promise<PermissionResponse>;

export type Permissions = PermissionType[];

const appPermissions: Permissions = [];

type Props = {
  children: ReactNode;
};

const PermissionsProvider = ({ children }: Props) => {
  const [permissions, setPermissions] = useState({});
  const [requesting, setRequesting] = useState<Permissions>([]);

  const requestPermissions = useCallback(
    (fn: PermissionsRequest, types: PermissionType[]) => {
      setRequesting(types);

      fn(...types)
        .then(res => {
          setPermissions(res.permissions);
          setRequesting(requesting.filter(type => types.includes(type)));
        })
        .catch(() =>
          setRequesting(requesting.filter(type => types.includes(type)))
        );
    },
    [setPermissions, setRequesting]
  );

  const ask = useCallback(
    (...types: Permissions) => requestPermissions(askAsync, types),
    [requestPermissions, askAsync]
  );

  const get = useCallback(
    (...types: Permissions) => requestPermissions(getAsync, types),
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

export default PermissionsProvider;
