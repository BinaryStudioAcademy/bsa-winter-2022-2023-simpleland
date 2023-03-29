import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { type OptionProps, components } from 'react-select';

import { Select } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import style from './style.module.scss';

type OptionType = {
  value: string;
  label: string;
};

type Properties = {
  className?: string;
};

type FormValues = {
  ageGroup: string;
};

const TargetAudience: React.FC<Properties> = ({
  className,
}: Properties): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className={getValidClassNames(style['wrapper'], className)}>
      <h1 className={getValidClassNames(style['step-question'])}>
        What is your Target audience?
      </h1>
      <p className={getValidClassNames(style['chose-age'])}>Choose the age</p>
      <Select
        control={control}
        name="ageGroup"
        options={[
          { value: 'kids', label: 'Kids 8-14' },
          { value: 'teenager', label: 'Teenager 14-18' },
          { value: 'young-adult', label: 'Young adult 18-35' },
          { value: 'adult', label: 'Adult 35-65' },
          { value: 'elderly', label: 'Elderly 65-99' },
        ]}
        placeholder="Please select your industry"
        errors={errors}
        isMulti={true}
        customComponents={{
          Option: (properties: OptionProps<OptionType, true>): JSX.Element => (
            <components.Option {...properties}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={!!properties.isSelected}
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
    </div>
  );
};

TargetAudience.propTypes = {
  className: PropTypes.string,
};

export { TargetAudience };
