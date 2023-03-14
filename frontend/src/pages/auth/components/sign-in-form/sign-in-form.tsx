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
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <h1 className="heading-2">Log In</h1>
        <h3 className="body-2">
          No account?&nbsp;
          <Link to={AppRoute.SIGN_UP}>Sign Up</Link>
        </h3>
      </div>
      <form onSubmit={handleFormSubmit} className={styles.formWrapper}>
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
        <div className={styles.btnWrapper}>
          <Button type="submit" label="Log In" isSmall={true} />
        </div>
      </form>
    </>
  );
};

export { SignInForm };
