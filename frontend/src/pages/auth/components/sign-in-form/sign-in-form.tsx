import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
    mode: 'onSubmit',
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={styles['sign-in']}>
      <h2 className={styles['sign-in-title']}>Log In</h2>
      <div className={styles['question']}>
        No account?&nbsp;{' '}
        <Link to={AppRoute.SIGN_UP} className={styles['sign-up-link']}>
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className={styles['form-wrapper']}>
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          name="password"
          control={control}
          errors={errors}
        />
        <Button
          type="submit"
          style="primary"
          size="small"
          label="Log In"
          className={styles['submit-button'] as string}
        />
      </form>
    </div>
  );
};

export { SignInForm };
