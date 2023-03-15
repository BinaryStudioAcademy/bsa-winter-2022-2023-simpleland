import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';
import { useEffect, useNavigate } from '~/libs/hooks/hooks.js';
import { storage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type UserGetAllItemResponseDto } from '~/packages/users/users.js';

const ProtectedRoute = (): React.ReactElement => {
  const navigate = useNavigate();
  const { users }  = useSelector((user: { users: UserGetAllItemResponseDto[], dataStatus: string }) => user);
  const hasUser = Boolean(users);

  useEffect(() => {
    storage
      .get(StorageKey.TOKEN)
      .then((token) => {
        if (!token && !hasUser) {
          navigate(AppRoute.SIGN_IN);
        }
      })
      .catch((error) => {
        const typedError = error as Error;
        throw new Error(typedError.message);
      });
  }, [navigate, hasUser]);

  return <Outlet />;
};

export { ProtectedRoute };
