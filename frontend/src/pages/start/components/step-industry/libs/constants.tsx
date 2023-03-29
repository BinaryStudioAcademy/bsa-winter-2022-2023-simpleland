import { type StepIndustryDto } from '~/packages/stepper/validation-schemas/validation-schema.js';

const DEFAULT_STEP_INDUSTRY_VALUE: StepIndustryDto = {
  industrySelect: { value: '', label: '' },
  industryInput: '',
};

export { DEFAULT_STEP_INDUSTRY_VALUE };
