import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
};

const Image: React.FC<Properties> = ({
  src,
  alt,
  className = '',
  width,
  height,
}: Properties) => (
  <img
    className={getValidClassNames(styles['image'], className)}
    width={width}
    height={height}
    src={src}
    alt={alt}
  />
);

export { Image };
