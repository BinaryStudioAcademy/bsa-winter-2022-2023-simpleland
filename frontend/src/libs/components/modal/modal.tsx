import { createPortal } from 'react-dom';

import { IconButton } from '~/libs/components/components.js';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
  children,
  isOpen,
  onClose,
}: Properties) => {
  const reference = useRef<null | HTMLDialogElement>(null);
  useEffect(() => {
    if (!reference.current) {
      return;
    }

    if (isOpen && !reference.current.hasAttribute('open')) {
      return reference.current.showModal();
    }
  }, [isOpen, reference]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog ref={reference} className={styles['modal']}>
      <div className={styles['modal-inner']}>
        <div className={styles['modal-inner-header']}>
          <IconButton
            icon="cross"
            label="Close modal"
            className={styles['modal-pop-up-close'] as string}
            onClick={onClose}
          />
        </div>
        <div className={styles['modal-inner-content']}>{children}</div>
      </div>
    </dialog>,
    document.body,
  );
};

export { Modal };
