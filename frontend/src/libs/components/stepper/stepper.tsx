import { Button } from '~/libs/components/components.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useStepper } from '~/libs/hooks/hooks.js';

import ArrowIcon from '../../../assets/img/arrow-left.svg';
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
  const { currentStep, changeStep, isFirstStep, isLastStep } = useStepper({
    stepsLength,
  });
  const buttonLabel = isLastStep ? saveButtonText : nextButtonText;
  const barYellowWidth = Math.round(((currentStep - step) / stepsLength) * 100);

  const stepBlock = useMemo(() => {
    return children[currentStep - step];
  }, [children, currentStep]);

  const toNextStep = useCallback(() => {
    if (currentStep === stepsLength) {
      return;
    }
    changeStep(currentStep + step);
  }, [currentStep, changeStep, stepsLength]);

  const toPreviousStep = useCallback(() => {
    if (currentStep === step) {
      return;
    }
    changeStep(currentStep - step);
  }, [currentStep, changeStep]);

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
            <Icon
              iconPath={ArrowIcon}
              className={getValidClassNames(
                styles.img,
                isFirstStep && styles.imgDisabled,
              )}
              onClick={toPreviousStep}
            />
            <Icon
              iconPath={ArrowIcon}
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
