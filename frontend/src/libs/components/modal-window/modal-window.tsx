import ReactDOM from 'react-dom';

import closePopUpIcon from '~/assets/img/close-pop-up-icon.svg';

import styles from './styles.module.scss';

const ModalWindow: React.FC = () => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <button className={styles.modalPopUpClose}>
          <img alt="close" src={closePopUpIcon} />
        </button>
      </div>
    </>,
    document.body,
  );
};

export { ModalWindow };
