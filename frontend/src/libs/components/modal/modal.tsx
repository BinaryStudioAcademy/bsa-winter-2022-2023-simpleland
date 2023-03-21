import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import { IconButton } from '~/libs/components/components.js';
import { useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  children?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({ children }: Properties) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <dialog className={styles.modal} id="modal">
              <div className={styles.modalInner}>
                <IconButton
                  icon="cross"
                  label="Close modal"
                  className={styles.modalPopUpClose as string}
                  onClick={onClose}
                />
                {children}
              </div>
              <div className={styles.backdrop} />
            </dialog>
          </>,
          document.body,
        )}
    </>
  );
};

export { Modal };
