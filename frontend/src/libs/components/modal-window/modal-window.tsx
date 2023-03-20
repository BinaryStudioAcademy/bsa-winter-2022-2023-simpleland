import { Portal } from 'react-portal';

import closePopUpIcon from '~/assets/img/close-pop-up-icon.svg';

import styles from './styles.module.scss';

const ModalWindow: React.FC = () => {
  return (
    <Portal>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <button className={styles.modalPopUpClose}>
          <img alt="close" src={closePopUpIcon} />
        </button>
      </div>
    </Portal>
  );
};

export { ModalWindow };
