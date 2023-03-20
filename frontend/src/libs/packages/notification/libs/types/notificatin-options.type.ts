import { type ValueOf } from 'shared/build';

import { type NotificationType } from '../enums/notification-type.enum.js';

type NotificatinOptions = {
  type: ValueOf<typeof NotificationType>;
};

export { type NotificatinOptions };
