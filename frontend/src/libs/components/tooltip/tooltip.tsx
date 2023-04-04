import 'react-tooltip/dist/react-tooltip.css';

import { Tooltip } from 'react-tooltip';

import { TooltipId } from '~/libs/enums/enums.js';

const AppTooltip: React.FC = () => {
  return <Tooltip id={TooltipId.MAIN} />;
};

export { AppTooltip };
