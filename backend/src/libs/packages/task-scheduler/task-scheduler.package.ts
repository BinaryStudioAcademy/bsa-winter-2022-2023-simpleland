import cron from 'node-cron';

class TaskScheduler {
  public schedule(cronExpression: string, callback: () => void): void {
    cron.schedule(cronExpression, callback);
  }
}

export { TaskScheduler };
