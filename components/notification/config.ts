import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const dailyReminderCategory = 'dailyReminder';

export enum DailyReminderButtonType {
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

  Notifications.setNotificationCategoryAsync(dailyReminderCategory, [
    {
      identifier: DailyReminderButtonType.REMIND_LATER,
      buttonTitle: 'Remind me later',
      options: {
        opensAppToForeground: false,
      },
    },
    {
      identifier: DailyReminderButtonType.OPEN_CALENDAR,
      buttonTitle: `Let's do it!`,
      options: {
        opensAppToForeground: true,
      },
    },
  ]);
}

export async function schedulePushNotification() {
  console.log('schedulePushNotification');
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Take care of your plants 🌱',
      body: 'By taking care regularly your plants are growing bigger and bigger',
      data: {},
      categoryIdentifier: dailyReminderCategory,
      autoDismiss: true,
    },
    trigger: { seconds: 2 },
  });
}

export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  if (Platform.OS === 'web') {
    alert('Push notifications are not supported on web');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return null;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('generated new token', token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('PlantItNotification', {
      name: 'PlantItNotification',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
