import LibraryCarousel, { type ControlProps } from 'nuka-carousel';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Carousel: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleDotClick = useCallback((index: number) => {
    return () => {
      setCurrentSlide(index);
    };
  }, []);

  const renderDots = useCallback(
    ({ pagingDotsIndices, currentSlide }: ControlProps): JSX.Element => {
      return (
        <div className={styles['dots-container']}>
          {pagingDotsIndices.map((index) => {
            const isActive = currentSlide === index;

            return (
              <button
                onClick={handleDotClick(index)}
                className={getValidClassNames(
                  styles['dot'],
                  isActive && styles['active'],
                )}
                key={index}
              />
            );
          })}
        </div>
      );
    },
    [handleDotClick],
  );

  return (
    <div className={styles['carousel']}>
      <LibraryCarousel
        renderBottomCenterControls={renderDots}
        slideIndex={currentSlide}
        defaultControlsConfig={{
          prevButtonClassName: styles['default-buttons'] as string,
          nextButtonClassName: styles['default-buttons'] as string,
          pagingDotsContainerClassName: styles['default-dots'] as string,
        }}
      >
        {children}
      </LibraryCarousel>
    </div>
  );
};

export { Carousel };
