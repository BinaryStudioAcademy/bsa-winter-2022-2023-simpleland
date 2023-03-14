import React from 'react';

import styles from './header.module.scss';

type Properties<T> = T;

const Header: React.FC<Properties<React.PropsWithChildren>> = ({
  children,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.headerLogo} />
        <span className={styles.headerLogoText}>logo</span>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </header>
  );
};

export { Header };
