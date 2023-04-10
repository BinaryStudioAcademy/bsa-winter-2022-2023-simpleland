import { Image } from '~/libs/components/components.js';
import { type SiteMainContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteMainContent;
  renderButton: () => JSX.Element;
};

const Main: React.FC<Properties> = ({
  content: { description, title, picture },
  renderButton,
}: Properties) => {
  return (
    <div className={styles['main']}>
      <div className={styles['main-content']}>
        <div className={styles['main-content-left']} />
        <div className={styles['main-content-right']}>
          {renderButton()}
          <div className={styles['main-title']}>{title}</div>
          <div className={styles['main-description']}>{description}</div>
          <button className={styles['main-button']}>Get started</button>
        </div>
      </div>

      <Image
        src={picture}
        alt="SimpleLand"
        className={styles['main-picture']}
      />
    </div>
  );
};

export { Main };
