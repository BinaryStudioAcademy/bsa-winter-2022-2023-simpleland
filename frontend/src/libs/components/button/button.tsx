import styles from './styles.module.scss';

type Properties = {
  label: string;
  size?: 'big' | 'small';
  style?: 'primary' | 'secondary' | 'plain';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
};

const Button: React.FC<Properties> = ({
  label,
  size = 'big',
  style = 'primary',
  type = 'button',
  isDisabled = false,
  className = '',
}: Properties) => (
  <button
    type={type}
    disabled={isDisabled}
    className={`${styles.button} ${styles[style]} ${styles[size]} ${className}`}
  >
    {label}
  </button>
);

export { Button };
