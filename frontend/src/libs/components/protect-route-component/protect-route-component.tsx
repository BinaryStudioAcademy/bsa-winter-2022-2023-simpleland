import React from 'react';
import { Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';
import { useEffect, useNavigate } from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';

const ProtectRouteComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  useEffect(() => {
    storage
      .get(StorageKey.TOKEN)
      .then((token) => {
        if (!token) {
          navigate(AppRoute.SIGN_IN);
        }
      })
      .catch((error) => {
        const typedError = error as Error;
        throw new Error(typedError.message);
      });
  }, [navigate]);

  return <Outlet />;
};

export { ProtectRouteComponent };
