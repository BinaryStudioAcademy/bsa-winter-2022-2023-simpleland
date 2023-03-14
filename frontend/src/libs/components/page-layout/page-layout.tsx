import styles from './styles.module.scss';

type Properties = {
  style?: 'yellow' | 'black';
  children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
  children,
  style = 'yellow',
}: Properties) => (
  <div className={`${styles.pageLayout} ${styles[style]}`}>{children}</div>
);

export { PageLayout };
