import { type ValueOf } from '~/libs/types/types.js';

import { type NotificationType } from '../enums/enums.js';

interface INotification {
  show(message: string, type: ValueOf<typeof NotificationType>): void;
}

export { type INotification };
