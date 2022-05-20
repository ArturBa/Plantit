/* eslint-disable class-methods-use-this */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { AbstractNotificationHandler } from './AbstractNotificationHandler';

const careScheduledNotificationCategory = 'careScheduledNotificationCategory';

export enum CareScheduledNotificationType {
  OPEN_CALENDAR = 'OPEN_CALENDAR',
  REMIND_LATER = 'REMIND_LATER',
}

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.setNotificationCategoryAsync(
    careScheduledNotificationCategory,
    [
      {
        identifier: CareScheduledNotificationType.REMIND_LATER,
        buttonTitle: 'Remind me later',
        options: {
          opensAppToForeground: false,
        },
      },
      {
        identifier: CareScheduledNotificationType.OPEN_CALENDAR,
        buttonTitle: `Let's do it!`,
        options: {
          opensAppToForeground: true,
        },
      },
    ],
  );
}

export async function CareScheduledNotification({ seconds } = { seconds: 2 }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Take care of your plants 🌱',
      body: 'By taking care regularly your plants are growing bigger and bigger',
      data: {},
      categoryIdentifier: careScheduledNotificationCategory,
      autoDismiss: true,
    },
    trigger: { seconds },
  });
}

export class CareScheduledNotificationHandler extends AbstractNotificationHandler {
  onNotificationReceived(notification: Notifications.Notification): void {
    console.log(
      'CareScheduledNotificationHandler.onNotificationReceivedListener',
    );
  }

  onNotificationResponseReceived(
    notification: Notifications.NotificationResponse,
  ): void {
    if (
      notification.actionIdentifier ===
      CareScheduledNotificationType.OPEN_CALENDAR
    ) {
      console.log('OPEN_CALENDAR');
    }
    if (
      notification.actionIdentifier ===
      CareScheduledNotificationType.REMIND_LATER
    ) {
      CareScheduledNotification({ seconds: 60 });
      Notifications.dismissNotificationAsync(
        notification.notification.request.identifier,
      );
    }
  }
}
