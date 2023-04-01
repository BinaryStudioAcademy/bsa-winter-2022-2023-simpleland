import { Button, Input, Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  userUpdateLoginValidationSchema,
} from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
  onSubmitUpdateUserLogin: (payload: UserUpdateLoginRequestDto) => void;
  isOpen: boolean;
  onClose: () => void;
};

const UpdateLoginForm: React.FC<Properties> = ({
  user,
  isOpen,
  onSubmitUpdateUserLogin,
  onClose,
}: Properties) => {
  const { control, errors, handleSubmit } =
    useAppForm<UserUpdateLoginRequestDto>({
      defaultValues: {
        login: user.email,
        repeatLogin: '',
      },
      validationSchema: userUpdateLoginValidationSchema,
    });

  const handleUpdateUserLogin = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmitUpdateUserLogin)(event_);
    },
    [handleSubmit, onSubmitUpdateUserLogin],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles['form-wrapper']} onSubmit={handleUpdateUserLogin}>
        <div className={styles['form-inner']}>
          <span className={styles['form-title']}>Change login</span>
          <div className={styles['inputs']}>
            <Input
              type="email"
              label="E-mail"
              placeholder="name@gmail.com"
              name="login"
              inputMode="email"
              control={control}
              errors={errors}
            />
            <Input
              type="email"
              label="Repeat e-mail"
              placeholder="Enter your first name"
              name="repeatLogin"
              inputMode="email"
              control={control}
              errors={errors}
            />
          </div>
          <div className={styles['buttons']}>
            <Button
              type="submit"
              style="primary"
              size="small"
              label="Save"
              className={getValidClassNames(
                styles['button'],
                styles['submit-button'],
              )}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export { UpdateLoginForm };
