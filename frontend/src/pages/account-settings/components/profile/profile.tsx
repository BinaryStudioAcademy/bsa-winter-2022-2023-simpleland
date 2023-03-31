import { Button, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { userUpdateValidationSchema } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
  onUpdateUser: (payload: UserUpdateRequestDto) => void;
};

const Profile: React.FC<Properties> = ({ user, onUpdateUser }: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<UserUpdateRequestDto>({
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        accountName: user.accountName ?? '',
      },
      validationSchema: userUpdateValidationSchema,
    });

  const handleFormCancel = useCallback(() => {
    handleReset({
      firstName: user.firstName,
      lastName: user.lastName,
      accountName: user.accountName ?? '',
    });
  }, [handleReset, user]);

  const handleUpdateUserDetails = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onUpdateUser)(event_);
    },
    [handleSubmit, onUpdateUser],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleUpdateUserDetails}>
      <div className={styles['profile-image']} />
      <div className={styles['inputs']}>
        <Input
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          control={control}
          errors={errors}
        />
        <Input
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          control={control}
          errors={errors}
        />
        <Input
          type="text"
          label="Account Name"
          placeholder="Enter account name"
          name="accountName"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles['buttons']}>
        <Button
          type="button"
          style="secondary"
          size="small"
          label="Cancel"
          className={styles['button']}
          onClick={handleFormCancel}
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
  );
};

export { Profile };
