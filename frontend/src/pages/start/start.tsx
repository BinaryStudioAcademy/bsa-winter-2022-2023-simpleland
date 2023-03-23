import { Logo, PageLayout, Stepper } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const StartPage: React.FC = () => {
  return (
    <PageLayout style="black" className={styles['layout']}>
      <div className={styles['page-wrapper']}>
        <Logo />

        <div className={styles['content']}>
          <div className={styles['content-text']}>
            First, tell us about your project
          </div>
          <div className={styles['content-info']}>
            <Stepper className={styles['stepper-wrapper']} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { StartPage };
