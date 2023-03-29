import { type StepIndustryDto } from 'shared/build/index.js';

import { PageLayout, Stepper } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { StepIndustry } from './components/step-industry/step-industry.js';
import styles from './styles.module.scss';

const Start: React.FC = () => {
  const handlesStepSubmit = useCallback((payload: StepIndustryDto): void => {
    payload;
  }, []);
  const steps = [
    <StepIndustry key="secondStep" onSubmit={handlesStepSubmit} />,
    <StepIndustry key="secondStep" onSubmit={handlesStepSubmit} />,
  ];

  return (
    <PageLayout style="black" className={styles['layout']}>
      <div className={styles['page-wrapper']}>
        <div className={styles['content']}>
          <div className={styles['content-text']}>
            First, tell us about your project
          </div>
          <div className={styles['content-info']}>
            <Stepper className={styles['stepper-wrapper']}>{steps}</Stepper>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export { Start };
