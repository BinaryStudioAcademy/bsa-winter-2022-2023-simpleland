import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  style?: 'yellow' | 'black';
};

const PageLayout: React.FC<Properties> = ({
  children,
  style = 'yellow',
}: Properties) => (
  <div className={getValidClassNames(styles.pageLayout, styles[style])}>
    {children}
  </div>
);

export { PageLayout };