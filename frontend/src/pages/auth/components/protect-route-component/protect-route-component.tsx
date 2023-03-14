import React from 'react';
import { Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';
import {
  useCallback,
  useEffect,
  useLocation,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';

const ProtectRouteComponent = (): React.ReactElement => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuth = useCallback(async (): Promise<void> => {
    try {
      const token = await storage.get(StorageKey.TOKEN);
      if (!token && pathname !== AppRoute.SIGN_UP) {
        navigate(AppRoute.SIGN_IN);
      }
    } catch (error) {
      const typedError = error as Error;
      throw new Error(typedError.message);
    }
  }, [navigate, pathname]);
  useEffect(() => {
    void isAuth();
  }, [isAuth]);

  return <Outlet />;
};

export { ProtectRouteComponent };
