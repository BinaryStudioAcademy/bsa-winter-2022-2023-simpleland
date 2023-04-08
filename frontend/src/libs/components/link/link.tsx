import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  className?: string | undefined;
  children: React.ReactNode;
  isActive?: (match: string, location: string) => boolean;
  activeClassName?: string | undefined;
};

const Link: React.FC<Properties> = ({
  children,
  to,
  className,
  activeClassName,
}: Properties): React.ReactElement => {
  const getLinkClassNames = useCallback(
    ({ isActive }: { isActive: boolean }): string =>
      getValidClassNames(
        styles['link'],
        className,
        isActive ? activeClassName : undefined,
      ),
    [className, activeClassName],
  );

  return (
    <NavLink to={to} className={getLinkClassNames}>
      {children}
    </NavLink>
  );
};

export { Link };
