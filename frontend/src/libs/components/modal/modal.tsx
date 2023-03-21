import { createPortal } from 'react-dom';

import { IconButton } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const Modal: React.FC = () => {
  return createPortal(
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <IconButton
          icon="closePopUp"
          label="Close modal"
          className={styles.modalPopUpClose as string}
        />
      </div>
    </>,
    document.body,
  );
};

export { Modal };
