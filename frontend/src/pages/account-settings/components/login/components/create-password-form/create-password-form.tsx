import {
  Button,
  IconButton,
  Input,
  Modal,
} from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback, useToggle } from '~/libs/hooks/hooks.js';
import {
  type UserUpdatePasswordRequestDto,
  userUpdatePasswordValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_UPDATE_PASSWORD_PAYLOAD } from './libs/constants.js';
import { PASSWORD_TOOLTIP } from './libs/tooltip.constants.js';
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
    });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const [showPassword, toggleShowPassword] = useToggle(false);
  const [showNewPassword, toggleShowNewPassword] = useToggle(false);
  const [showRepeatPassword, toggleShowRepeatPassword] = useToggle(false);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2 className={styles['title']}>Change Password</h2>
        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <div className={styles['input-container']}>
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              control={control}
              errors={errors}
            />
            <IconButton
              label="password"
              icon={showPassword ? 'eye-slash' : 'eye'}
              onClick={toggleShowPassword}
              className={styles['input-icon']}
            />
          </div>

          <div className={styles['input-box']}>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              label="New password"
              name="newPassword"
              control={control}
              errors={errors}
              tooltip={PASSWORD_TOOLTIP}
              isTooltipShowedOnlyOnError
            />
            <IconButton
              label="New password"
              icon={showNewPassword ? 'eye-slash' : 'eye'}
              onClick={toggleShowNewPassword}
              className={styles['input-manipulate']}
            />
          </div>

          <div className={styles['input-wrapper']}>
            <Input
              type={showRepeatPassword ? 'text' : 'password'}
              label="Repeat new password"
              name="repeatNewPassword"
              control={control}
              errors={errors}
            />
            <IconButton
              label="Repeat password"
              icon={showRepeatPassword ? 'eye-slash' : 'eye'}
              onClick={toggleShowRepeatPassword}
              className={styles['input-control']}
            />
          </div>

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
