import { createPortal } from 'react-dom';

import { IconButton } from '~/libs/components/components.js';
import { useEffect, useRef } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
} & React.PropsWithChildren;

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
    else if (!isOpen && reference.current.hasAttribute('open')) {
      return reference.current.close();
    }
  }, [isOpen, reference]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog ref={reference} className={styles.modal}>
      <div className={styles.modalInner}>
        <IconButton
          icon="cross"
          label="Close modal"
          className={styles.modalPopUpClose as string}
          onClick={onClose}
        />
        {children}
      </div>
    </dialog>,
    document.body,
  );
};

export { Modal };
