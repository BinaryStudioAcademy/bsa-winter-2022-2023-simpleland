import { type IconType, iconNameToSvgIcon } from './common.js';

type Properties = {
  iconName: IconType;
  className?: string;
};

const Icon: React.FC<Properties> = ({ iconName, className }: Properties) => {
  const SvgIcon = iconNameToSvgIcon[iconName];

  return <SvgIcon className={className} />;
};

export { Icon };
