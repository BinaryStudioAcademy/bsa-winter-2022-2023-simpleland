import { ReactComponent as ArrowLeft } from '~/assets/img/arrow-left.svg';
import { ReactComponent as ArrowRight } from '~/assets/img/arrow-right.svg';
import { ReactComponent as ClosePopUp } from '~/assets/img/close-pop-up-icon.svg';
import { type IconType } from '~/libs/types/types.js';

const iconNameToSvgIcon: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  'arrowRight': ArrowRight,
  'arrowLeft': ArrowLeft,
  'closePopUp': ClosePopUp,
};

export { iconNameToSvgIcon };
