import styles from './not-found.module.scss';

const ErrorPage = (): JSX.Element => {

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.warningMessage}>Oops!</h1>
      <p className={styles.text404}>
        404
      </p>
      <p>
        <i className={styles.status}>Page not found</i>
      </p>
    </div>
  );
};

export { ErrorPage as ErrorFunction };
