import styles from './styles.module.scss';

const Logo: React.FC = () => {
  return (
    <div className={styles['logo-wrapper']}>
      <div className={styles['logo-icon']} />
      <span className={styles['logo-text']}>logo</span>
    </div>
  );
};

export { Logo };
