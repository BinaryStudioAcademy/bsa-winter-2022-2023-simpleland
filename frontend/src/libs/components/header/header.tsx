import styles from './header.module.scss';

type Properties = {
  caption: string;
  username: string;
  image: string;
};

const Header: React.FC<Properties> = ({
  caption,
  username,
  image,
}: Properties) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.headerLogo} />
        <span className={styles.headerLogoText}>logo</span>
      </div>
      <div className={styles.headerSidebar}>
        <span className={styles.headerSectionTitle}>{caption}</span>
        <div className={styles.headerProfileData}>
          <img
            src={image}
            alt="profile-icon"
            className={styles.headerProfileIcon}
          />
          <span className={styles.headerProfileCaption}>{username}</span>
        </div>
      </div>
    </header>
  );
};

export { Header };
