import './styles.scss';

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
      btn
      buttonText-2
      ${isFull ? 'btnEmpty' : 'btnFull'}
      ${isSmall ? 'btnSmall' : ''}
    `}
    disabled={disabled}
  >
    {label}
  </button>
);

export { Button };
