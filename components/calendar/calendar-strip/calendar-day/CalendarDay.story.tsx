import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import moment from 'moment';

import { CalendarDay } from './CalendarDay';

import { colors } from '../../../../constants';
import { CalendarTheme } from '../CalendarTheme';

const CalendarDayMeta: ComponentMeta<typeof CalendarDay> = {
  title: 'Components/Calendar/Day',
  component: CalendarDay,
  argTypes: {
    onPress: { action: 'clicked' },
  },
};

const accentColor = colors.accentBasic;
const backgroundColor = colors.background;
const textColor = colors.textBlack;
const textLightColor = colors.textGray;

const calendarTheme: CalendarTheme = {
  backgroundColor,
  indicatorColor: accentColor,
  textColor,
  textLightColor,
  selectedDayBackgroundColor: accentColor,
  dotColor: accentColor,
  arrowColor: accentColor,
  todayTextColor: accentColor,
};

export default CalendarDayMeta;

type CalendarStory = ComponentStory<typeof CalendarDay>;
export const Basic: CalendarStory = args => <CalendarDay {...args} />;
Basic.args = {
  date: moment().subtract(1, 'd'),
  // theme: calendarTheme,
};

export const Marked: CalendarStory = args => <CalendarDay {...args} />;
Marked.args = {
  ...Basic.args,
  marked: true,
};

export const Selected: CalendarStory = args => <CalendarDay {...args} />;
Selected.args = {
  ...Basic.args,
  selected: true,
};

export const Today: CalendarStory = args => <CalendarDay {...args} />;
Today.args = {
  ...Basic.args,
  date: moment(),
};

export const Themed: CalendarStory = args => <CalendarDay {...args} />;
Themed.args = {
  ...Basic.args,
  theme: calendarTheme,
};
