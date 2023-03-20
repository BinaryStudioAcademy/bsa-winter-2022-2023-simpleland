import { useCallback, useState } from '~/libs/hooks/hooks.js';

const ONE_STEP_LENGTH = 1;
const SAVE_BUTTON_TEXT = 'Save';
const NEXT_BUTTON_TEXT = 'Go next';

type UseStepper = (parameters: { length: number }) => {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  buttonLabel: string;
  barYellowWidth: number;
  toNextStep: () => void;
  toPreviousStep: () => void;
};

const useStepper: UseStepper = ({ length }) => {
  const [currentStep, setCurrentStep] = useState(ONE_STEP_LENGTH);
  const isFirstStep = currentStep === ONE_STEP_LENGTH;
  const isLastStep = currentStep === length;
  const buttonLabel = isLastStep ? SAVE_BUTTON_TEXT : NEXT_BUTTON_TEXT;
  const barYellowWidth = Math.round(
    ((currentStep - ONE_STEP_LENGTH) / length) * 100,
  );

  const onStepChange = useCallback((step: number): void => {
    setCurrentStep(step);
  }, []);

  const toNextStep = useCallback(() => {
    if (currentStep === length) {
      return;
    }
    onStepChange(currentStep + ONE_STEP_LENGTH);
  }, [currentStep, onStepChange, length]);

  const toPreviousStep = useCallback(() => {
    if (currentStep === ONE_STEP_LENGTH) {
      return;
    }
    onStepChange(currentStep - ONE_STEP_LENGTH);
  }, [currentStep, onStepChange]);

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    buttonLabel,
    barYellowWidth,
    toNextStep,
    toPreviousStep,
  };
};

export { useStepper };
