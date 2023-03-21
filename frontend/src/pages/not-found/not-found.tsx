import styles from './styles.module.scss';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles['not-found-page']}>
      <h1 className={styles['warning-message']}>Oops!</h1>
      <p className={styles['warning-number']}>404</p>
      <p className={styles['status']}>Page not found</p>
    </div>
  );
};

export { NotFound };
