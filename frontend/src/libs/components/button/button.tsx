import styles from './styles.module.scss';

type Properties = {
  label: string;
  size?: 'big' | 'small';
  style?: 'primary' | 'secondary' | 'plain';
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<Properties> = ({
  label,
  size = 'big',
  style = 'primary',
  className = '',
  ...mirroredProperties
}: Properties) => (
  <button
    className={`${styles.button} ${styles[style]} ${styles[size]} ${className}`}
    {...mirroredProperties}
  >
    {label}
  </button>
);

export { Button };
