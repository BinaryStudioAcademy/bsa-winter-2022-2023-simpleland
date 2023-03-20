import { ReactComponent as ArrowLeft } from '~/assets/img/arrow-left.svg';
import { ReactComponent as ArrowRight } from '~/assets/img/arrow-right.svg';

type IconType = 'arrowRight' | 'arrowLeft';

const iconNameToSvgIcon: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  'arrowRight': ArrowRight,
  'arrowLeft': ArrowLeft,
};

export { type IconType, iconNameToSvgIcon };
