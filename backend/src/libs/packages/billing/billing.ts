import { config } from '~/libs/packages/config/config.js';

import { Billing } from './billing.package.js';

const billing = new Billing({ config });

export { billing };
