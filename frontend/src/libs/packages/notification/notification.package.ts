import { toast } from 'react-toastify';

import { type ValueOf } from '~/libs/types/types.js';

import { type NotificationType } from './libs/enums/enums.js';
import { type INotification } from './libs/interfaces/interfaces.js';

class Notification implements INotification {
  public show(message: string, type: ValueOf<typeof NotificationType>): void {
    toast[type](message);
  }
}

export { Notification };
