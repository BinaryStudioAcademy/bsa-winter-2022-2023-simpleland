import { Redirect } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

const Root: React.FC = () => {
  return <Redirect to={AppRoute.MY_PROJECTS} />;
};

export { Root };
