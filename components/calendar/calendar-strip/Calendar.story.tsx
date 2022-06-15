import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import React from 'react';

import { Calendar } from './Calendar';

const CalendarMeta: ComponentMeta<typeof Calendar> = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    selectedDay: { control: 'date' },
    onDayPress: { action: 'clicked' },
  },
};

export default CalendarMeta;

type CalendarStory = ComponentStory<typeof Calendar>;

export const Basic: CalendarStory = args => <Calendar {...args} />;
Basic.args = {
  selectedDay: new Date(),
  hideArrows: true,
};

export const WithMarkedDays: CalendarStory = args => <Calendar {...args} />;
WithMarkedDays.args = {
  selectedDay: new Date(2022, 5, 5),
  markedDays: [new Date(2022, 5, 5), new Date(2022, 5, 6)],
  hideArrows: false,
};

export const WithCustomTheme: CalendarStory = args => <Calendar {...args} />;
WithCustomTheme.args = {
  selectedDay: new Date(),
  hideArrows: false,
  theme: {
    backgroundColor: '#f5f5f5',
    textColor: 'purple',
    textLightColor: 'red',
    indicatorColor: 'purple',
    selectedDayBackgroundColor: '#f5f5f5',
    dotColor: 'purple',
    arrowColor: 'purple',
    todayTextColor: 'green',
  },
};
