import { Button, IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useMemo, useStepper } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ONE_STEP_LENGTH = 1;
const SAVE_BUTTON_TEXT = 'Save';
const NEXT_BUTTON_TEXT = 'Go next';

type Properties = {
  children?: React.ReactNode[];
  className?: string | undefined;
};

const Stepper: React.FC<Properties> = ({
  children = [],
  className,
}: Properties) => {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    barYellowWidth,
    handleNextStep,
    handlePreviousStep,
  } = useStepper({ length: children.length });
  const buttonLabel = isLastStep ? SAVE_BUTTON_TEXT : NEXT_BUTTON_TEXT;

  const stepBlock = useMemo(() => {
    return children[currentStep - ONE_STEP_LENGTH];
  }, [children, currentStep]);

  return (
    <div className={getValidClassNames(styles['wrapper'], className)}>
      <div>
        <div className={styles['bar-wrapper']}>
          <div className={styles['bar']}>
            <div
              className={getValidClassNames(
                styles['bar'],
                styles['bar-yellow'],
              )}
              style={{ width: `${barYellowWidth}%` }}
            />
          </div>

          <div className={styles['stepper-wrapper']}>
            <div className={styles['img-wrapper']}>
              <IconButton
                icon="arrowLeft"
                label="Go to the previous step"
                onClick={handlePreviousStep}
                isDisabled={isFirstStep}
              />
              <IconButton
                icon="arrowRight"
                label="Go to the next step"
                onClick={handleNextStep}
                isDisabled={isLastStep}
              />
            </div>

            <div className={styles['text']}>
              <span className={styles['yellow']}>{currentStep}</span>/
              {children.length}
            </div>
          </div>
        </div>

        <div className={styles['children-wrapper']}>{stepBlock}</div>
      </div>

      <Button
        type="submit"
        label={buttonLabel}
        style="secondary"
        size="small"
        onClick={handleNextStep}
        className={getValidClassNames(styles['button'])}
      />
    </div>
  );
};

export { Stepper };
