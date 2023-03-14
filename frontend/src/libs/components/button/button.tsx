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
      button-text-2
      ${isFull ? 'btn-empty' : 'btn-full'}
      ${isSmall ? 'btn--small' : ''}
    `}
    disabled={disabled}
  >
    {label}
  </button>
);

export { Button };
