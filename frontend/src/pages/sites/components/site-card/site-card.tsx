import mockImage from 'src/assets/img/site-mock-image.jpg';

import { Divider, IconButton } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SiteGetAllItemResponseDto } from '~/packages/sites/sites.js';

import styles from './styles.module.scss';

type Properties = {
  site: SiteGetAllItemResponseDto;
};

const SiteCard: React.FC<Properties> = ({ site }: Properties) => {
  const { name, image, id: siteId } = site;
  const imgUrl = image ?? mockImage;

  const createSiteLink = configureString<ValueOf<typeof AppRoute>>(
    AppRoute.SITES_$SITE_ID,
    {
      siteId,
    },
  );

  return (
    <div className={styles['card']}>
      <img className={styles['image']} src={imgUrl} alt="site theme" />

      <div className={styles['content-wrapper']}>
        <h2 className={styles['title']}>{name}</h2>

        <div className={styles['content']}>
          <div className={styles['text-wrapper']}>
            <p className={styles['text']}>Go to site</p>
            <IconButton
              icon="arrowRight"
              label="Go to site"
              className={styles['yellow']}
              to={createSiteLink}
            />
          </div>

          <Divider />

          <div className={styles['text-wrapper']}>
            <p className={styles['text']}>Make your website public</p>
            <IconButton
              icon="arrowRight"
              label="Make your website public"
              className={styles['yellow']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { SiteCard };
