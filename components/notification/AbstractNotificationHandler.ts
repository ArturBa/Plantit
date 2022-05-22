import * as Notifications from 'expo-notifications';

export abstract class AbstractNotificationHandler {
  abstract onNotificationReceived(
    notification: Notifications.Notification,
  ): void;

  abstract onNotificationResponseReceived(
    notification: Notifications.NotificationResponse,
  ): void;
}
