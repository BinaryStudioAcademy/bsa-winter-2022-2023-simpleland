import 'react-tooltip/dist/react-tooltip.css';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from './styles.module.scss';

const Tooltip: React.FC = () => {
  return (
    <ReactTooltip
      id="app-main-tooltip"
      className={styles['tooltip'] as string}
    />
  );
};

export { Tooltip };
