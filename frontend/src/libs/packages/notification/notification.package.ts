import { type ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

class Notification {
  public error(message: string): void {
    this.show(message, {
      type: 'error',
    });
  }
  private show(message: string, parameters: ToastOptions): void {
    toast(message, parameters);
  }
}

export { Notification };
