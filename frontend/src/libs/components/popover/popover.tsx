import { useCallback, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  content: React.ReactNode;
  trigger: React.ReactNode;
};

const Popover: React.FC<Properties> = ({
  content,
  trigger,
}: Properties): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = useCallback((): void => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        setIsOpen(!isOpen);
      }
    },
    [isOpen],
  );

  return (
    <div className={styles['popover-wrapper']}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {trigger}
      </div>
      {isOpen && <div className={styles['popover-content']}>{content}</div>}
    </div>
  );
};

export { Popover };
