import avatarPlaceholder from '~/assets/img/default-avatar-profile-icon.svg';
import { Button, Image, Input } from '~/libs/components/components.js';
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
  onUpdateUserAvatar: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Profile: React.FC<Properties> = ({
  user,
  onUpdateUser,
  onUpdateUserAvatar,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<UserUpdateRequestDto>({
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        accountName: user.accountName ?? '',
      },
      validationSchema: userUpdateValidationSchema,
      mode: 'onSubmit',
    });

  const handleUpdateUserDetails = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onUpdateUser)(event_);
    },
    [handleSubmit, onUpdateUser],
  );

  return (
    <form className={styles['form-wrapper']} onSubmit={handleUpdateUserDetails}>
      <label className={styles['profile-image-wrapper']}>
        <Image
          src={user.avatarUrl ?? avatarPlaceholder}
          alt="avatar"
          className={styles['profile-image']}
        />
        <input
          type="file"
          onChange={onUpdateUserAvatar}
          className="visually-hidden"
        />
      </label>
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
  );
};

export { Profile };
