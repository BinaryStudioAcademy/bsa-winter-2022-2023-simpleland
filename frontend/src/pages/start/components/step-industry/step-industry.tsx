import { Input, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type StepIndustryDto,
  stepIndustryValidationSchema,
} from '~/packages/stepper/validation-schemas/validation-schema.js';

import { DEFAULT_STEP_INDUSTRY_VALUE } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (data: StepIndustryDto) => void;
};
const StepIndustry: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<StepIndustryDto>({
    defaultValues: DEFAULT_STEP_INDUSTRY_VALUE,
    validationSchema: stepIndustryValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const options = [
    { value: 'Casino', label: 'Casino' },
    { value: 'Cafeteria', label: 'Cafeteria' },
    { value: 'VinoVodochniy', label: 'VinoVodochniy' },
  ];

  return (
    <>
      <h1 className={styles['title-text']}>What is your industry?</h1>
      <p className={styles['title-description']}>
        Choose the one from the list or enter the custom one
      </p>
      <form onSubmit={handleFormSubmit}>
        <Select
          control={control}
          errors={errors}
          name="industrySelect"
          placeholder="Please select your industry"
          options={options}
        />
        <Input
          type="text"
          label=""
          placeholder="Please enter your industry"
          name="industryInput"
          control={control}
          errors={errors}
        />
      </form>
    </>
  );
};

export { StepIndustry };
