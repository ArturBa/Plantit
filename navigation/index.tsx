/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';

import { NotificationProvider } from '../components/notification/NotificationProvider';
import { colors } from '../constants';
import CalendarScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {
  PlantDetailsCardScreen,
  PlantModifyCardScreen,
  PlantAddCardScreen,
} from '../screens/PlantModal';
import SettingsScreen from '../screens/SettingsScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      background: colors.background,
      primary: colors.accentBasic,
      text: colors.accentBasic,
      border: colors.accentBasic,
      notification: colors.accentBasic,
      card: colors.background,
    },
  };
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <NotificationProvider>
        <RootNavigator />
      </NotificationProvider>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group>
        <Stack.Screen
          name="PlantDetailsModal"
          component={PlantDetailsCardScreen}
          options={{ headerTitle: 'Plant Details' }}
        />
        <Stack.Screen
          name="PlantAddModal"
          component={PlantAddCardScreen}
          options={{ headerTitle: 'New Plant' }}
        />
        <Stack.Screen
          name="PlantModifyModal"
          component={PlantModifyCardScreen}
          options={{ headerTitle: 'Update Plant' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.accentBasic,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: HomeTabBarIcon,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: CalendarTabBarIcon,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: SettingsTabBarIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}

function HomeTabBarIcon({ color }: { color: string }) {
  return <TabBarIcon name="seedling" color={color} />;
}
function CalendarTabBarIcon({ color }: { color: string }) {
  return <TabBarIcon name="calendar" color={color} />;
}
function SettingsTabBarIcon({ color }: { color: string }) {
  return (
    <FontAwesome
      size={30}
      style={tabBarIconStyle.icon}
      name="gear"
      color={color}
    />
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={tabBarIconStyle.icon} {...props} />;
}

const tabBarIconStyle = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
