import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type UseFormHandleSubmit,
  type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type UseAppFormParameters<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type UseAppFormResult<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode,
}: UseAppFormParameters<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    mode,
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    errors,
    handleSubmit,
  };
};

export { useAppForm };
