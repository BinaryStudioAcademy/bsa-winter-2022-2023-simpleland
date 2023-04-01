import PropTypes from 'prop-types';
import { type OptionProps, components } from 'react-select';

import { Select } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type StepTargetDto,
  stepTargetValidationSchema,
} from '~/packages/stepp/validation-shemas/validation-schema.js';

import style from './style.module.scss';

type OptionType = {
  value: string;
  label: string;
  className?: string;
};

type Properties = {
  className?: string;
  onSubmit: (data: StepTargetDto) => void;
};

const DEFAULT_STEP_TARGET_VALUE: StepTargetDto = {
  targetSelect: { value: '', label: '' },
} as const;

const TargetAudience: React.FC<Properties> = ({
  className, onSubmit
}: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<StepTargetDto>({
    defaultValues: DEFAULT_STEP_TARGET_VALUE,
    mode: 'onSubmit',
    validationSchema: stepTargetValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={getValidClassNames(style['wrapper'], className)}>
      <h1 className={getValidClassNames(style['step-question'])}>
        What is your Target audience?
      </h1>
      <p className={getValidClassNames(style['chose-age'])}>Choose the age</p>
      <form id="test-step" onSubmit={handleFormSubmit}>
      <Select
  control={control}
  name="targetSelect"
  options={[
    { value: 'kids', label: 'Kids 8-14' },
    { value: 'teenager', label: 'Teenager 14-18' },
    { value: 'young-adult', label: 'Young adult 18-35' },
    { value: 'adult', label: 'Adult 35-65' },
    { value: 'elderly', label: 'Elderly 65-99' },
  ]}
  placeholder="Please select your industry"
  errors={errors}
  customComponents={{
    Option: (properties: OptionProps<OptionType, true>): JSX.Element => (
      <components.Option {...properties}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
             defaultChecked={properties.isSelected}
            style={{
              marginRight: '9px',
            }}
          />
          <div>{properties.label}</div>
        </div>
      </components.Option>
    ),
  }}
/>
      </form>
    </div>
  );
};

TargetAudience.propTypes = {
  className: PropTypes.string,
};

export { TargetAudience };

