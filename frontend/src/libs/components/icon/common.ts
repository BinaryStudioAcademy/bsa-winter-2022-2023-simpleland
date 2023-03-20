import { ReactComponent as Arrow } from '~/assets/img/arrow-left.svg';
import { IconName } from '~/libs/enums/enums.js';

const iconNameToSvgIcon = {
  [IconName.ARROW]: Arrow,
};

export { iconNameToSvgIcon };
