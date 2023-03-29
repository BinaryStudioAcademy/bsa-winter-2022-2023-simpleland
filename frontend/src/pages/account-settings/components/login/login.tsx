import {
  type UserAuthResponse,
  type UserUpdateLoginRequestDto,
  userUpdateLoginValidationSchema,
} from 'shared/build/index.js';

import { Button, IconButton, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import { type UserUpdatePasswordRequestDto } from '~/packages/users/users.js';
import { CreatePasswordForm } from '~/pages/account-settings/components/login/components/create-password-form/create-password-form.js';
import { actions as userActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Login: React.FC<Properties> = ({ user }: Properties) => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const { control, errors, handleReset } =
    useAppForm<UserUpdateLoginRequestDto>({
      defaultValues: {
        login: user.email,
        password: user.accountName ?? '',
      },
      validationSchema: userUpdateLoginValidationSchema,
    });

  const handlePasswordModalOpen = useCallback(() => {
    setIsOpenPasswordModal(true);
  }, []);

  const handlePasswordModalClose = useCallback(() => {
    setIsOpenPasswordModal(false);
  }, []);

  const dispatch = useAppDispatch();

  const handlePasswordSubmit = useCallback(
    (payload: UserUpdatePasswordRequestDto): void => {
      void dispatch(userActions.updatePassword(payload))
        .unwrap()
        .then(() => {
          handlePasswordModalClose();
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
        </form>
      )}
    </>
  );
};

export { Login };
