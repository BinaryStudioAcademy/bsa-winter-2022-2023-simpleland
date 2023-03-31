import { IconButton, Input } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useEffect,
  useMemo,
  useModal,
} from '~/libs/hooks/hooks.js';
import { NotificationType } from '~/libs/packages/notification/notification.js';
import {
  type UserAuthResponse,
  type UserCredentials,
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  userCredentialsValidationSchema,
} from '~/packages/users/users.js';
import {
  CreatePasswordForm,
  UpdateLoginsForm,
} from '~/pages/account-settings/components/login/components/components.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as userActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

const MESSAGE = 'Your password has been successfully changed';

type Properties = {
  user: UserAuthResponse;
};

const Login: React.FC<Properties> = ({ user }: Properties) => {
  const dispatch = useAppDispatch();
  const credentialsFormValues = useMemo(
    () => ({
      login: user.email,
      password: '',
    }),
    [user],
  );

  const { control, errors, handleReset } = useAppForm<UserCredentials>({
    defaultValues: credentialsFormValues,
    validationSchema: userCredentialsValidationSchema,
  });

  useEffect(() => {
    handleReset(credentialsFormValues);
  }, [credentialsFormValues, handleReset]);

  const {
    isOpenModal: isOpenLoginModal,
    handleModalClose: handleLoginModalClose,
    handleModalOpen: handleLoginModalOpen,
  } = useModal();

  const handleSubmitUpdateUserLogin = useCallback(
    (payload: UserUpdateLoginRequestDto): void => {
      void dispatch(userActions.updateUserLogin(payload))
        .unwrap()
        .then(() => {
          handleLoginModalClose();
          void dispatch(
            appActions.notify({
              type: NotificationType.SUCCESS,
              message: 'Email updated',
            }),
          );
        });
    },
    [dispatch, handleLoginModalClose],
  );

  const {
    isOpenModal: isOpenPasswordModal,
    handleModalClose: handlePasswordModalClose,
    handleModalOpen: handlePasswordModalOpen,
  } = useModal();

  const handlePasswordSubmit = useCallback(
    (payload: UserUpdatePasswordRequestDto): void => {
      void dispatch(userActions.updateUserPassword(payload))
        .unwrap()
        .then(() => {
          handlePasswordModalClose();
          void dispatch(
            appActions.notify({
              type: NotificationType.SUCCESS,
              message: MESSAGE,
            }),
          );
        });
    },
    [dispatch, handlePasswordModalClose],
  );

  return (
    <>
      {isOpenLoginModal && (
        <UpdateLoginsForm
          user={user}
          isOpen={isOpenLoginModal}
          onSubmitUpdateUserLogin={handleSubmitUpdateUserLogin}
          onClose={handleLoginModalClose}
        />
      )}
      {isOpenPasswordModal && (
        <CreatePasswordForm
          onSubmit={handlePasswordSubmit}
          isOpen={isOpenPasswordModal}
          onCloseModal={handlePasswordModalClose}
        />
      )}
      {!isOpenLoginModal && !isOpenPasswordModal && (
        <form className={styles['form-wrapper']}>
          <div className={styles['inputs']}>
            <div className={styles['input-wrapper']}>
              <Input
                type="text"
                label="E-mail"
                placeholder="name@gmail.com"
                name="login"
                control={control}
                errors={errors}
                isDisabled={true}
              />
              <IconButton
                icon="pencil"
                label="E-mail"
                className={styles['input-icon']}
                onClick={handleLoginModalOpen}
              />
            </div>
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
                icon="pencil"
                label="Open password modal"
                className={styles['input-icon']}
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
