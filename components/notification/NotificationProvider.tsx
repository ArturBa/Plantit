import React, { createContext, useContext, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Subscription } from 'expo-modules-core';

export interface NotificationContextData {
  expoPushToken: string | null;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationContextData, setNotificationContextData] = useState<
    NotificationContextData | undefined
  >(undefined);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  if (!notificationContextData) {
    return <ActivityIndicator />;
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
