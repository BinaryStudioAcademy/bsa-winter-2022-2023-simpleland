import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  children: React.ReactNode;
};

const Link: React.FC<Properties> = ({ children, to }: Properties) => (
  <NavLink to={to} className={styles.link}>{children}</NavLink>
);

export { Link };
