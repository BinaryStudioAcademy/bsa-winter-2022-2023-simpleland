import { Header } from '~/libs/components/components.js';
import { useAppSelector, useEffect } from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const mockUser: UserAuthResponse = {
    // replace with user from store
    id: 1,
    email: 'pisotska.o@gmail.com',
    firstName: 'Alyona',
    lastName: 'Pisotska',
  };

  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(sitesActions.getSites({ projectId: 1 }));
  }, [dispatch]);

  const { sites } = useAppSelector((state) => ({
    sites: state.sites.sites?.items,
  }));

  return (
    <div>
      <Header user={mockUser} />
      <div className={styles.cardsWrapper}>
        {sites?.map((site) => (
          <div key={site.id}>{site.name}</div>
        ))}
      </div>
    </div>
  );
};

export { Sites };
