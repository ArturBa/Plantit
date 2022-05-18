import * as Notifications from 'expo-notifications';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Subscription } from 'expo-modules-core';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
  DailyReminderButtonType,
} from './config';

export default function NotificationTest() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>('');
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(setExpoPushToken)
      .catch(console.error);

    notificationListener.current =
      Notifications.addNotificationReceivedListener(n => {
        // setNotification(n);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        if (
          response.actionIdentifier === DailyReminderButtonType.REMIND_LATER
        ) {
          console.log("Notification action: 'Remind me later'");
          Notifications.dismissNotificationAsync(
            response.notification.request.identifier,
          );
          schedulePushNotification();
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
