import { ReactComponent as ArrowLeft } from '~/assets/img/arrow-left.svg';
import { ReactComponent as ArrowRight } from '~/assets/img/arrow-right.svg';
import { ReactComponent as Cross } from '~/assets/img/cross.svg';
import { ReactComponent as Eye } from '~/assets/img/eye.svg';
import { ReactComponent as EyeSlash } from '~/assets/img/eye-slash.svg';
import { ReactComponent as Pencil } from '~/assets/img/pencil.svg';
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
  'pencil': Pencil,
  'eye': Eye,
  'eye-slash': EyeSlash,
};

export { iconNameToSvgIcon };
