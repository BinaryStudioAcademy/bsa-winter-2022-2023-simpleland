import { useCallback, useState } from '~/libs/hooks/hooks.js';

const ONE_STEP_LENGTH = 1;

type UseStepper = (parameters: { length: number }) => {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  barYellowWidth: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const useStepper: UseStepper = ({ length }) => {
  const [currentStep, setCurrentStep] = useState(ONE_STEP_LENGTH);
  const isFirstStep = currentStep === ONE_STEP_LENGTH;
  const isLastStep = currentStep === length;
  const barYellowWidth = Math.round(
    ((currentStep - ONE_STEP_LENGTH) / length) * 100,
  );

  const handleStepChange = useCallback((step: number): void => {
    setCurrentStep(step);
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep === length) {
      return;
    }
    handleStepChange(currentStep + ONE_STEP_LENGTH);
  }, [currentStep, handleStepChange, length]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep === ONE_STEP_LENGTH) {
      return;
    }
    handleStepChange(currentStep - ONE_STEP_LENGTH);
  }, [currentStep, handleStepChange]);

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    barYellowWidth,
    handleNextStep,
    handlePreviousStep,
  };
};

export { useStepper };
