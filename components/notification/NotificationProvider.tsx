import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './config';
import { CareScheduledNotificationHandler } from './CareScheduledNotification';
import { AbstractNotificationHandler } from './AbstractNotificationHandler';
import { ActivityIndicatorScreen } from '../../screens/ActivityIndicatorScreen';

export interface NotificationContextData {
  expoPushToken: string | null;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

const notificationHandlers: AbstractNotificationHandler[] = [
  new CareScheduledNotificationHandler(),
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>('');
  const [notificationContextData, setNotificationContextData] = useState<
    NotificationContextData | undefined
  >(undefined);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(setExpoPushToken)
      .catch(console.error);

    notificationListener.current =
      Notifications.addNotificationReceivedListener(n => {
        notificationHandlers.forEach(handler => {
          handler.onNotificationReceived(n);
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(n => {
        notificationHandlers.forEach(handler => {
          handler.onNotificationResponseReceived(n);
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        notificationListener.current!,
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  useEffect(() => {
    setNotificationContextData({
      expoPushToken,
    });
  }, [expoPushToken]);

  if (!notificationContextData) {
    return <ActivityIndicatorScreen title="Watering Plants" />;
  }

  return (
    /* eslint-disable react/jsx-no-constructed-context-values */
    <NotificationContext.Provider value={notificationContextData}>
      {children}
    </NotificationContext.Provider>
    /* eslint-enable react/jsx-no-constructed-context-values */
  );
};

export function useNotification() {
  const context = useContext(NotificationContext);
  return context;
}
