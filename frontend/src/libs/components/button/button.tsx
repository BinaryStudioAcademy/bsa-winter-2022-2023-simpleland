import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  isFull?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  isFull = true,
  isSmall = false,
  disabled = false,
}: Properties) => (
  <button
    type={type}
    className={`
      buttonText-2
      ${styles.btn}
      ${isFull ? styles.btnEmpty : styles.btnFull}
      ${isSmall ? styles.btnSmall : ''}
    `}
    disabled={disabled}
  >
    {label}
  </button>
);

export { Button };
