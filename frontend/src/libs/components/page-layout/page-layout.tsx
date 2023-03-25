import { Header } from '~/libs/components/header/header.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  style?: 'yellow' | 'black' | 'white';
  className?: string | undefined;
  pageName?: string;
};

const PageLayout: React.FC<Properties> = ({
  children,
  style = 'yellow',
  className = '',
  pageName = '',
}: Properties) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  return (
    <div
      className={getValidClassNames(
        styles['page-layout'],
        styles[style],
        className,
      )}
    >
      {user && <Header user={user} pageName={pageName} />}
      {children}
    </div>
  );
};

export { PageLayout };
