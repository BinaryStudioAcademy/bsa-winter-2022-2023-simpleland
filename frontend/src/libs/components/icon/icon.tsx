import { type IconType } from '~/libs/types/types.js';

import { iconNameToSvgIcon } from './common.js';

type Properties = {
  iconName: IconType;
  className?: string | undefined;
};

const Icon: React.FC<Properties> = ({ iconName, className }: Properties) => {
  const SvgIcon = iconNameToSvgIcon[iconName];

  return <SvgIcon className={className} />;
};

export { Icon };
