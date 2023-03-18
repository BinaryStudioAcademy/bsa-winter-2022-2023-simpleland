import { type ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

class Notification {
  public error(message: string): void {
    this.show(message, {
      type: 'error',
    });
  }
  public info(message: string): void {
    this.show(message, {
      type: 'info',
    });
  }
  public success(message: string): void {
    this.show(message, {
      type: 'success',
    });
  }
  public warning(message: string): void {
    this.show(message, {
      type: 'warning',
    });
  }
  public default(message: string): void {
    this.show(message, {
      type: 'default',
    });
  }

  private show(message: string, parameters: ToastOptions): void {
    toast(message, parameters);
  }
}

export { Notification };
