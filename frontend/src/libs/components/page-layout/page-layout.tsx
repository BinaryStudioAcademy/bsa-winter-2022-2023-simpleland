import styles from './styles.module.scss';

type Properties = {
  className?: 'yellow' | 'black';
  children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
  children,
  className = 'yellow',
}: Properties) => (
  <div className={`${styles.pageLayout} ${styles[className]}`}>{children}</div>
);

export { PageLayout };
