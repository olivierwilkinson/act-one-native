import React, {
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  PermissionType,
  PermissionResponse,
  AUDIO_RECORDING,
  getAsync,
  askAsync,
} from "expo-permissions";

import PermissionsContext from "../../../contexts/Permissions";
import useIsMounted from "../../../hooks/useIsMounted";

export type Permissions = PermissionType[];
type PermissionsRequest = (
  ...types: Permissions
) => Promise<PermissionResponse>;

const appPermissions: Permissions = [AUDIO_RECORDING];

type Props = {
  children: ReactNode;
};

const PermissionsProvider = ({ children }: Props) => {
  const [permissions, setPermissions] = useState({});
  const [requesting, setRequesting] = useState<Permissions>([]);
  const isMounted = useIsMounted();

  const requestPermissions = useCallback(
    (fn: PermissionsRequest, types: PermissionType[]) => {
      setRequesting(types);

      fn(...types)
        .then((res) => {
          if (isMounted.current) {
            setPermissions(res.permissions);
            setRequesting(requesting.filter((type) => types.includes(type)));
          }
        })
        .catch(() => {
          if (!isMounted.current) {
            setRequesting(requesting.filter((type) => types.includes(type)));
          }
        });
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
        get,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;
