import { useForm } from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { SelectTarget } from '../../select-target/select.js';
import style from './style.module.scss';

type Properties = {
  children?: React.ReactNode[];
  className?: string | undefined;
};

type FormValues = {
  ageGroup: string;
};

const TargetAudience: React.FC<Properties> = ({ className }: Properties) => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <div className={getValidClassNames(style['wrapper'], className)}>
      <h1 className={getValidClassNames(style['step-question'])}>
        What is your Target audience?
      </h1>
      <p className={getValidClassNames(style['chose-age'])}>
        Choose the age
      </p>
      <SelectTarget
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
      />
    </div>
  );
};

export { TargetAudience };
