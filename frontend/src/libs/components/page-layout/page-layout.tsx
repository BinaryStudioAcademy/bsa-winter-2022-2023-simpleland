import { Header } from '~/libs/components/header/header.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  style?: 'yellow' | 'black';
};

const PageLayout: React.FC<Properties> = ({
  children,
  style = 'yellow',
}: Properties) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  return (
    <div className={getValidClassNames(styles.pageLayout, styles[style])}>
      <Header user={user} />
      {children}
    </div>
  );
};

export { PageLayout };
