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
  userCredentialsValidationSchema,
} from '~/packages/users/users.js';
import { UpdateLoginsForm } from '~/pages/account-settings/components/login/components/components.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as usersActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Login: React.FC<Properties> = ({ user }: Properties) => {
  const credentialsFormValues = useMemo(() => ({
    login: user.email,
    password: '',
  }), [user]);
  const dispatch = useAppDispatch();

  const { control, errors, handleReset } = useAppForm<UserCredentials>({
    defaultValues: credentialsFormValues,
    validationSchema: userCredentialsValidationSchema,
  });

  useEffect(() => {
    handleReset(credentialsFormValues);
    }, [credentialsFormValues, handleReset]);

  const { isOpenModal: isOpenLoginModal, handleModalClose: handleLoginModalClose, handleModalOpen: handleLoginModalOpen } =
    useModal();

  const handleSubmitUpdateUserLogin = useCallback(
    (payload: UserUpdateLoginRequestDto): void => {
      void dispatch(usersActions.updateUserLogin(payload))
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

  return (
    <>
      {isOpenLoginModal ? (
        <UpdateLoginsForm
          user={user}
          isOpen={isOpenLoginModal}
          onSubmitUpdateUserLogin={handleSubmitUpdateUserLogin}
          onClose={handleLoginModalClose}
        />
      ) : (
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
                onClick={handleLoginModalOpen}
                className={styles['input-icon']}
              />
            </div>
            <Input
              type="password"
              label="Password"
              placeholder="password"
              name="password"
              control={control}
              errors={errors}
            />
          </div>
        </form>
      )}
    </>
  );
};

export { Login };
