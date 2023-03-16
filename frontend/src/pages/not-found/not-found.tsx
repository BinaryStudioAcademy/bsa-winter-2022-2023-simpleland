import styles from './not-found.module.scss';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.warningMessage}>Oops!</h1>
      <p className={styles.warningNumber}>404</p>
      <p className={styles.status}>Page not found</p>
    </div>
  );
};

export { NotFound };
