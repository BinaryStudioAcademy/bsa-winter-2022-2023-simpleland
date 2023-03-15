import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
  className?: string;
  children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
  children,
  className,
}: Properties) => (
  <div className={clsx(styles.pageLayout, className)}>{children}</div>
);

export { PageLayout };
