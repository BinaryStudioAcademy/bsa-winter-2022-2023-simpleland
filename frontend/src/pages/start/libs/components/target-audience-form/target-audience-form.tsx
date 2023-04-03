import { type OptionProps, components } from 'react-select';

import { Button, Select } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateStepTarget,
  siteCreateStepTargetValidationSchema,
} from '~/packages/sites/sites.js';

import { DEFAULT_STEP_TARGET_VALUE, options } from './libs/constants.js';
import style from './style.module.scss';

type OptionType = {
  value: string;
  label: string;
  className?: string;
};

type Properties = {
  className?: string;
  children?: React.ReactNode;
  onSubmit: (sitePayload: Partial<SiteCreateStepTarget>) => void;
};

const TargetAudience: React.FC<Properties> = ({
  onSubmit,
}: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<SiteCreateStepTarget>({
    defaultValues: DEFAULT_STEP_TARGET_VALUE,
    mode: 'onSubmit',
    validationSchema: siteCreateStepTargetValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={getValidClassNames(style['wrapper'])}>
      <h1 className={getValidClassNames(style['step-question'])}>
        What is your Target audience?
      </h1>
      <p className={getValidClassNames(style['chose-age'])}>Choose the age</p>
      <form className={style['form']} onSubmit={handleFormSubmit}>
        <Select
          control={control}
          name="targetAudience"
          isMulti
          hideSelectedOptions={false}
          options={options}
          placeholder="Please select your industry"
          errors={errors}
          customComponents={{
            Option: (
              properties: OptionProps<OptionType, true>,
            ): JSX.Element => (
              <components.Option {...properties}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    className={style['checkbox']}
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
        <Button
          label="Next"
          style="secondary"
          size="small"
          type="submit"
          className={style['button']}
        />
      </form>
    </div>
  );
};

export { TargetAudience };
