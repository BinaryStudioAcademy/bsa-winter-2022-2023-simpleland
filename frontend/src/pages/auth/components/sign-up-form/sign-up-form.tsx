import {
  Button,
  IconButton,
  Input,
  Link,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import {
  useAppForm,
  useCallback,
  useTitle,
  useToggle,
} from '~/libs/hooks/hooks.js';
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './libs/constants.js';
import { SignUpFormTooltip } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  useTitle('Sign up');

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <div className={styles['sign-up']}>
      <h2 className={styles['sign-up-title']}>Sign Up</h2>
      <div className={styles['question']}>
        Already have an account?{' '}
        <Link to={AppRoute.SIGN_IN} className={styles['sign-in-link']}>
          Sign In
        </Link>
      </div>
      <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label="First name"
          placeholder="Enter your first name"
          name="firstName"
          control={control}
          errors={errors}
          tooltip={SignUpFormTooltip.FIRST_NAME}
          isTooltipShowedOnlyOnError
        />
        <Input
          type="text"
          label="Last name"
          placeholder="Enter your last name"
          name="lastName"
          control={control}
          errors={errors}
          tooltip={SignUpFormTooltip.LAST_NAME}
          isTooltipShowedOnlyOnError
        />
        <Input
          type="text"
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
          inputMode="email"
        />
        <div className={styles['input-wrapper']}>
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            name="password"
            control={control}
            errors={errors}
            tooltip={SignUpFormTooltip.PASSWORD}
            isTooltipShowedOnlyOnError
          />
          <IconButton
            label="password"
            icon={showPassword ? 'eye-slash' : 'eye'}
            onClick={toggleShowPassword}
            className={styles['input-icon']}
          />
        </div>
        <Button
          type="submit"
          style="primary"
          size="small"
          label="Sign up"
          className={styles['submit-button'] as string}
        />
      </form>
    </div>
  );
};

export { SignUpForm };
