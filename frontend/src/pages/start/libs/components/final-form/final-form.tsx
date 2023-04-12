import { Button } from '~/libs/components/components.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: () => void;
  siteInfo: SiteCreateRequestDto;
};

const FinalForm: React.FC<Properties> = ({
  onSubmit,
  siteInfo,
}: Properties) => {
  const { industry, name, targetAudience, tone } = siteInfo;
  const handleClick = useCallback((): void => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className={styles['wrapper']}>
      <h2 className={styles['title']}>Check your information:</h2>

      <div className={styles['info-wrapper']}>
        <div className={styles['info-item']}>
          <div>Site name</div>
          <div className={styles['item-name']}>{name}</div>
        </div>

        <div className={styles['info-item']}>
          <div>Site industry</div>
          <div className={styles['item-name']}>{industry}</div>
        </div>

        <div className={styles['info-item']}>
          <div>Site target audience</div>
          <div className={styles['item-name']}>{targetAudience}</div>
        </div>

        <div className={styles['info-item']}>
          <div>Site tone of voice</div>
          <div className={styles['item-name']}>{tone}</div>
        </div>
      </div>

      <Button
        label="Generate Site"
        size="small"
        onClick={handleClick}
        className={styles['button']}
      />
    </div>
  );
};

export { FinalForm };
