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
  activeClassName?: string | undefined;
};

const Link: React.FC<Properties> = ({
  children,
  to,
  className,
  activeClassName,
}: Properties): React.ReactElement => {
  const handleLinkClassNamesGet = useCallback(
    ({ isActive }: { isActive: boolean }): string =>
      getValidClassNames(
        styles['link'],
        className,
        isActive && activeClassName,
      ),
    [className, activeClassName],
  );

  return (
    <NavLink to={to} className={handleLinkClassNamesGet}>
      {children}
    </NavLink>
  );
};

export { Link };
