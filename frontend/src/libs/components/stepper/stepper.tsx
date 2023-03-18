import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';

import { ReactComponent as Arrow } from '../../../assets/img/arrow-left.svg';
import styles from './styles.module.scss';

const step = 1;
const saveButtonText = 'Save';
const nextButtonText = 'Go next';

type Properties = {
  children: React.ReactNode[];
  saveData?: () => void;
  className?: string;
};

const Stepper: React.FC<Properties> = ({
  children,
  saveData,
  className,
}: Properties) => {
  const stepsLength = children.length;
  const [currentStep, setCurrentStep] = useState(step);
  const isFirstStep = currentStep === step;
  const isLastStep = currentStep === stepsLength;
  const buttonLabel = isLastStep ? saveButtonText : nextButtonText;
  const barYellowWidth = Math.round(((currentStep - step) / stepsLength) * 100);

  const stepBlock = useMemo(() => {
    return children[currentStep - step];
  }, [children, currentStep]);

  const toNextStep = useCallback(() => {
    if (currentStep === stepsLength) {
      return;
    }
    setCurrentStep(currentStep + step);
  }, [currentStep, stepsLength]);

  const toPreviousStep = useCallback(() => {
    if (currentStep === step) {
      return;
    }
    setCurrentStep(currentStep - step);
  }, [currentStep]);

  const saveValues = useCallback(() => {
    if (saveData) {
      saveData();
    }
  }, [saveData]);

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div
            className={getValidClassNames(styles.bar, styles.barYellow)}
            style={{ width: `${barYellowWidth}%` }}
          ></div>
        </div>

        <div className={styles.stepperWrapper}>
          <div className={styles.imgWrapper}>
            <Arrow
              className={getValidClassNames(
                styles.img,
                isFirstStep && styles.imgDisabled,
              )}
              onClick={toPreviousStep}
            />

            <Arrow
              className={getValidClassNames(
                styles.img,
                styles.imgRight,
                isLastStep && styles.imgDisabled,
              )}
              onClick={toNextStep}
            />
          </div>

          <div className={styles.text}>
            <span className={styles.yellow}>{currentStep}</span>/{stepsLength}
          </div>
        </div>
      </div>

      <div className={styles.childrenWrapper}>{stepBlock}</div>

      <Button
        label={buttonLabel}
        style="secondary"
        size="small"
        onClick={isLastStep ? saveValues : toNextStep}
        className={styles.button}
      />
    </div>
  );
};

export { Stepper };
