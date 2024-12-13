export abstract class NotificationAdapter {
  abstract success(message: string, title?: string): void;
  abstract error(message: string, title?: string): void;
  abstract warning(message: string, title?: string): void;
  abstract info(message: string, title?: string): void;
}
