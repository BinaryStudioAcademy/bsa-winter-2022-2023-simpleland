import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  userUpdateLoginValidationSchema,
} from 'shared/build/index.js';

import { IconButton, Input } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  UsePasswordForm,
} from '~/libs/hooks/hooks.js';
import { NotificationType } from '~/libs/packages/notification/notification.js';
import { type UserUpdatePasswordRequestDto } from '~/packages/users/users.js';
import { CreatePasswordForm } from '~/pages/account-settings/components/login/components/components.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as userActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

const MESSAGE = 'Your password has been successfully changed';

type Properties = {
  user: UserAuthResponse;
};

const Login: React.FC<Properties> = ({ user }: Properties) => {
  const dispatch = useAppDispatch();
  const {
    isOpenPasswordModal,
    handlePasswordModalOpen,
    handlePasswordModalClose,
  } = UsePasswordForm();

  const { control, errors } = useAppForm<UserUpdateLoginRequestDto>({
    defaultValues: {
      login: user.email,
      password: '',
    },
    validationSchema: userUpdateLoginValidationSchema,
  });

  const handlePasswordSubmit = useCallback(
    (payload: UserUpdatePasswordRequestDto): void => {
      void dispatch(userActions.updatePassword(payload))
        .unwrap()
        .then(() => {
          handlePasswordModalClose();
          void dispatch(appActions.notify({ type: NotificationType.SUCCESS, message: MESSAGE }));
        });
    },
    [dispatch, handlePasswordModalClose],
  );

  return (
    <>
      {isOpenPasswordModal ? (
        <CreatePasswordForm
          onSubmit={handlePasswordSubmit}
          isOpen={isOpenPasswordModal}
          onCloseModal={handlePasswordModalClose}
        />
      ) : (
        <form className={styles['form-wrapper']}>
          <div className={styles['inputs']}>
            <Input
              type="text"
              label="E-mail"
              placeholder="name@gmail.com"
              name="login"
              control={control}
              errors={errors}
            />
            <div className={styles['input-wrapper']}>
              <Input
                type="password"
                label="Password"
                placeholder="password"
                name="password"
                control={control}
                errors={errors}
                isDisabled={true}
              />

              <IconButton
                label="Open password modal"
                icon="pen"
                className={styles['input-button']}
                onClick={handlePasswordModalOpen}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export { Login };
