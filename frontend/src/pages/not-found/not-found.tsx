import styles from './not-found.module.css';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.warningMessage}>Oops!</h1>
      <p className={styles.warningNumber}>404</p>
      <p>
        <i className={styles.status}>Page not found</i>
      </p>
    </div>
  );
};

export { NotFound };
