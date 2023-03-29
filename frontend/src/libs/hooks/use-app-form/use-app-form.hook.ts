import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormReset,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema: ValidationSchema;
  mode?: 'onChange' | 'onSubmit';
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  handleReset: UseFormReset<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode = 'onSubmit',
}: Parameters<T>): ReturnValue<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: handleReset,
  } = useForm<T>({
    defaultValues,
    resolver: joiResolver(validationSchema),
    mode,
  });

  return {
    control,
    errors,
    handleSubmit,
    handleReset,
  };
};

export { useAppForm };
