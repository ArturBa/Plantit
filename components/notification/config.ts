import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const dailyReminderCategory = 'dailyReminder';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.setNotificationCategoryAsync(dailyReminderCategory, [
  {
    identifier: 'yes',
    buttonTitle: 'Yes',
  },
]);

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to take care of your plants",
      body: 'Remember to water them!',
      data: { data: 'goes here' },
      categoryIdentifier: dailyReminderCategory,
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
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
