import ReactDOM from 'react-dom';

import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

const ModalWindow: React.FC = () => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <IconButton
          icon="closePopUp"
          label="Close modal"
          className={getValidClassNames('', styles.modalPopUpClose)}
        />
      </div>
    </>,
    document.body,
  );
};

export { ModalWindow };
