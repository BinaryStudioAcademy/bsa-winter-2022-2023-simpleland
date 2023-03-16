import styles from './styles.module.scss';

type Properties = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const Stepper: React.FC<Properties> = ({
  title,
  subtitle,
  children,
}: Properties) => (
  <div className={styles.stepperWrapper}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subtitle}>{subtitle}</p>
    <div>{children}</div>
  </div>
);

export { Stepper };
