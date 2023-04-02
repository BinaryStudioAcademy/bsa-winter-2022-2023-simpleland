import { ReactComponent as ArrowLeft } from '~/assets/img/arrow-left.svg';
import { ReactComponent as ArrowRight } from '~/assets/img/arrow-right.svg';
import { ReactComponent as Cross } from '~/assets/img/cross.svg';
import { ReactComponent as Search } from '~/assets/img/input-search.svg';
import { ReactComponent as Plus } from '~/assets/img/plus.svg';
import { type IconType } from '~/libs/types/types.js';

const iconNameToSvgIcon: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  'arrowRight': ArrowRight,
  'arrowLeft': ArrowLeft,
  'cross': Cross,
  'plus': Plus,
  'search': Search,
};

export { iconNameToSvgIcon };
