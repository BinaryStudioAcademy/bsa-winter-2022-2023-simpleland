import { Button, Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useMemo, useStepper } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ONE_STEP_LENGTH = 1;

type Properties = {
  children: React.ReactNode[];
  className?: string;
};

const Stepper: React.FC<Properties> = ({ children, className }: Properties) => {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    buttonLabel,
    barYellowWidth,
    toNextStep,
    toPreviousStep,
  } = useStepper({ length: children.length });

  const stepBlock = useMemo(() => {
    return children[currentStep - ONE_STEP_LENGTH];
  }, [children, currentStep]);

  return (
    <div className={getValidClassNames(styles.wrapper, className)}>
      <div className={styles.barWrapper}>
        <div className={styles.bar}>
          <div
            className={getValidClassNames(styles.bar, styles.barYellow)}
            style={{ width: `${barYellowWidth}%` }}
          />
        </div>

        <div className={styles.stepperWrapper}>
          <div className={styles.imgWrapper}>
            <Icon
              iconName="arrowLeft"
              className={getValidClassNames(
                styles.img,
                isFirstStep && styles.imgDisabled,
              )}
              onClick={toPreviousStep}
            >
              <span className="visually-hidden">Go to the previous step</span>
            </Icon>
            <Icon
              iconName="arrowRight"
              className={getValidClassNames(
                styles.img,
                isLastStep && styles.imgDisabled,
              )}
              onClick={toNextStep}
            >
              <span className="visually-hidden">Go to the next step</span>
            </Icon>
          </div>

          <div className={styles.text}>
            <span className={styles.yellow}>{currentStep}</span>/
            {children.length}
          </div>
        </div>
      </div>

      <div className={styles.childrenWrapper}>{stepBlock}</div>

      <Button
        label={buttonLabel}
        style="secondary"
        size="small"
        onClick={toNextStep}
        className={getValidClassNames(
          styles.button,
          isLastStep && 'visually-hidden',
        )}
        visuallyHiddenLabel="Go to the next step"
      />
    </div>
  );
};

export { Stepper };
