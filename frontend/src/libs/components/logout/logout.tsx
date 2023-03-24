import { Button } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  onLogout: () => void;
};

const Logout: React.FC<Properties> = ({ onLogout }: Properties) => {
  return (
    <Button
      type="submit"
      style="primary"
      size="small"
      label="Log Out"
      className={styles['submit-button'] as string}
      onClick={onLogout}
    />
  );
};

export { Logout };
