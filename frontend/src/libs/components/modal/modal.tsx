import { createPortal } from 'react-dom';

import { IconButton } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
};

const Modal: React.FC<Properties> = ({ children }) => {
  return createPortal(
    <dialog className={styles.modal}>
      <div className={styles.modalInner}>
        <IconButton
          icon="cross"
          label="Close modal"
          className={styles.modalPopUpClose as string}
        />
        {children}
      </div>
      <div className={styles.backdrop} />
    </dialog>,
    document.body,
  );
};

export { Modal };
