import { type UserAuthResponse,type UserUpdateLoginRequestDto,userUpdateLoginValidationSchema } from 'shared/build/index.js';

import { Button, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Login: React.FC<Properties> = ({ user }: Properties) => {

  const { control, errors, handleReset } =
    useAppForm<UserUpdateLoginRequestDto>({
      defaultValues: {
        login: user.email,
        password: user.accountName ?? '',
        },
      validationSchema: userUpdateLoginValidationSchema,
    });

  return <form className={styles['form-wrapper']}>
    <div className={styles['inputs']}>
      <Input
        type="text"
        label="E-mail"
        placeholder="name@gmail.com"
        name="login"
        control={control}
        errors={errors}
      />
      <Input
        type="password"
        label="Password"
        placeholder="password"
        name="password"
        control={control}
        errors={errors}
      />
    </div>
    <div className={styles['captions']}>
      <span className={styles['caption']}>Change Password</span>
    </div>
    <div className={styles['buttons']}>
      <Button
        type="button"
        style="secondary"
        size="small"
        label="Cancel"
        className={styles['button']}
        onClick={handleReset}
      />
      <Button
        type="submit"
        style="primary"
        size="small"
        label="Save Changes"
        className={getValidClassNames(
                styles['button'],
                styles['submit-button'],
                )}
      />
    </div>
  </form>;
};

export { Login };
