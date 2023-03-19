import { useState } from '~/libs/hooks/hooks.js';

type Parameters = {
  stepsLength: number;
};

type ReturnValue = {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  changeStep: (step: number) => void;
};

const useStepper = ({ stepsLength }: Parameters): ReturnValue => {
  const [currentStep, setCurrentStep] = useState(1);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === stepsLength;

  const handleChangeStep = (step: number): void => setCurrentStep(step);

  return { currentStep, isFirstStep, isLastStep, changeStep: handleChangeStep };
};

export { useStepper };
