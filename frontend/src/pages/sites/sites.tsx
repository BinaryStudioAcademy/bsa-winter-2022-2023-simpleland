import { Header, Navigate } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppSelector, useEffect, useParams } from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { SiteCard } from '~/pages/sites/components/components.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import styles from './styles.module.scss';

const mockUser: UserAuthResponse = {
  id: 1,
  email: 'pisotska.o@gmail.com',
  firstName: 'Alyona',
  lastName: 'Pisotska',
  accountName: 'Pisotska',
};

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (projectId) {
      void dispatch(sitesActions.getSites({ projectId: +projectId }));
    }
  }, [dispatch, projectId]);

  const { sites } = useAppSelector((state) => ({
    sites: state.sites.sites,
  }));

  if (projectId === undefined) {
    return <Navigate to={AppRoute.PROJECTS} replace />;
  }

  return (
    <>
      <Header user={mockUser} />
      <div className={styles['page-wrapper']}>
        <div className={styles['cards-wrapper']}>
          {sites.map((site) => (
            <SiteCard key={site.id} siteName={site.name} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Sites };
