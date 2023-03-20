import closePopUpIcon from '~/assets/img/close-pop-up-icon.svg';

import styles from './styles.module.scss';

const ModalWindow: React.FC = () => {
  return (
    <div className={styles.modal}>
      <button className={styles.modalPopUClose}>
        <img alt="close" src={closePopUpIcon} />
      </button>
    </div>
  );
};

export { ModalWindow };
