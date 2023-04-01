import { Button, Input, Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserUpdatePasswordRequestDto,
  userUpdatePasswordValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_UPDATE_PASSWORD_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: UserUpdatePasswordRequestDto) => void;
  className?: string;
};

const CreatePasswordForm: React.FC<Properties> = ({
  isOpen = false,
  onCloseModal,
  onSubmit,
  className = '',
}: Properties) => {
  const { control, errors, handleSubmit } =
    useAppForm<UserUpdatePasswordRequestDto>({
      defaultValues: DEFAULT_UPDATE_PASSWORD_PAYLOAD,
      validationSchema: userUpdatePasswordValidationSchema,
      mode: 'onSubmit',
    });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2 className={styles['title']}>Change Password</h2>
        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <Input
            control={control}
            errors={errors}
            label="Current Password"
            name="password"
            type="password"
          />

          <Input
            control={control}
            errors={errors}
            label="New Password"
            name="newPassword"
            type="password"
          />

          <Input
            control={control}
            errors={errors}
            label="Repeat New password"
            name="repeatNewPassword"
            type="password"
          />

          <Button
            type="submit"
            style="primary"
            size="small"
            label="Save"
            className={styles['submit-button']}
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreatePasswordForm };
