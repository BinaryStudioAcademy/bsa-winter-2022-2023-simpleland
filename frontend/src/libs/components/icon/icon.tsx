import { iconNameToSvgIcon } from './common.js';

type Properties = {
  iconName: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Icon: React.FC<Properties> = ({
  iconName,
  className,
  onClick,
}: Properties) => {
  const SvgIcon = iconNameToSvgIcon[iconName];

  return <SvgIcon className={className} onClick={onClick} />;
};

export { Icon };
