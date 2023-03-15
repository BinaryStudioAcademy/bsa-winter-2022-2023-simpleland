import React from 'react';
import { Outlet } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppSelector, useNavigate } from '~/libs/hooks/hooks.js';

const ProtectedRoute = (): React.ReactElement => {
  const navigate = useNavigate();
  const { users } = useAppSelector((user) => user);
  const hasUser = Boolean(users);

  if (!hasUser) {
    navigate(AppRoute.SIGN_IN);
  }

  return <Outlet />;
};

export { ProtectedRoute };
