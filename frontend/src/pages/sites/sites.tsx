import { Header } from '~/libs/components/components.js';
import { useAppSelector, useEffect, useParams } from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { SiteCard } from '~/pages/sites/components/components.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (projectId) {
      void dispatch(sitesActions.getSitesByProject({ projectId: +projectId }));
    }
  }, [dispatch, projectId]);

  const user = useAppSelector(({ auth }) => {
    return auth.user as UserAuthResponse;
  });

  const { sites } = useAppSelector((state) => ({
    sites: state.sites.sites,
  }));

  return (
    <>
      <Header user={user} />
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
