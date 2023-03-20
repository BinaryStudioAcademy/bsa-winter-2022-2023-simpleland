import { Button, IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useMemo, useStepper } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ONE_STEP_LENGTH = 1;
const SAVE_BUTTON_TEXT = 'Save';
const NEXT_BUTTON_TEXT = 'Go next';

type Properties = {
  children: React.ReactNode[];
  className?: string;
};

const Stepper: React.FC<Properties> = ({ children, className }: Properties) => {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    barYellowWidth,
    toNextStep,
    toPreviousStep,
  } = useStepper({ length: children.length });
  const buttonLabel = isLastStep ? SAVE_BUTTON_TEXT : NEXT_BUTTON_TEXT;

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
            <IconButton
              icon="arrowLeft"
              label="Go to the previous step"
              onClick={toPreviousStep}
              isDisabled={isFirstStep}
              isLabelVisuallyHidden
            />
            <IconButton
              icon="arrowRight"
              label="Go to the next step"
              onClick={toNextStep}
              isDisabled={isLastStep}
              isLabelVisuallyHidden
            />
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
      />
    </div>
  );
};

export { Stepper };
