import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SitePortfolioContent,
} from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

const MAX_IMAGES_COUNT = 8;

type Properties = {
  content: SitePortfolioContent;
  type: ValueOf<typeof SectionType>;
};

const Portfolio: React.FC<Properties> = ({
  content: { title, categories },
  type,
}: Properties) => {
  const [titleFirstWord, ...titleRest] = title.split(' ');
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  const [isAllVisible, setIsAllVisible] = useState(false);

  const handleSelectCategory = useCallback((value: number | null) => {
    return () => {
      setSelectedCategory(value);
    };
  }, []);

  const handleChangeIsAllVisible = useCallback(() => {
    setIsAllVisible((previousState) => !previousState);
  }, []);

  const isActiveCategory = useCallback(
    (value: number | null) => {
      return value === selectedCategory;
    },
    [selectedCategory],
  );

  const selectedImages = useMemo(() => {
    if (selectedCategory === null) {
      return categories.flatMap((category) => category.images);
    }

    return categories[selectedCategory]?.images ?? [];
  }, [categories, selectedCategory]);

  const visibleSelectedImages = useMemo(() => {
    return isAllVisible
      ? selectedImages
      : selectedImages.slice(0, MAX_IMAGES_COUNT);
  }, [selectedImages, isAllVisible]);

  const viewButtonLabel = useMemo(() => {
    return isAllVisible ? 'View less' : 'View more';
  }, [isAllVisible]);

  const isVisibleViewButtonLabel = useMemo(() => {
    return selectedImages.length > MAX_IMAGES_COUNT;
  }, [selectedImages]);

  return (
    <div id={type} className={styles['section-wrapper']}>
      <div className={styles['portfolio-wrapper']}>
        <div className={styles['title']}>
          {titleFirstWord}
          &nbsp;
          <span className={styles['title-brown']}>{titleRest.join(' ')}</span>
        </div>

        <div className={styles['button-wrapper']}>
          <div className={styles['categories-wrapper']}>
            <button
              onClick={handleSelectCategory(null)}
              className={getValidClassNames(
                styles['button'],
                isActiveCategory(null) && styles['button-brown'],
              )}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={`${category.name}/${index}`}
                onClick={handleSelectCategory(index)}
                className={getValidClassNames(
                  styles['button'],
                  isActiveCategory(index) && styles['button-brown'],
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {isVisibleViewButtonLabel && (
            <button
              className={getValidClassNames(
                styles['button'],
                styles['button-view'],
              )}
              onClick={handleChangeIsAllVisible}
            >
              {viewButtonLabel}
            </button>
          )}
        </div>

        <div className={styles['images-wrapper']}>
          {visibleSelectedImages.map((image, index) => (
            <img
              key={`portfolio-${index}`}
              src={image}
              alt={`portfolio-${index}`}
              className={styles['image']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Portfolio };
