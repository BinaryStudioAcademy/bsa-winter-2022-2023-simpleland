import { Loader, PageLayout, Redirect } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

type Properties = {
  children: React.ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}: Properties) => {
  const { user, status } = useAppSelector(({ auth }) => ({
    user: auth.user,
    status: auth.currentUserDataStatus,
  }));
  const hasAuthenticatedUser = Boolean(user);

  if (!hasAuthenticatedUser) {
    return <Redirect to={redirectPath} replace />;
  }

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return <>{children}</>;
};

export { ProtectedRoute };
