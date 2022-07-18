// import { ComponentMeta, ComponentStory } from '@storybook/react-native';
// import moment from 'moment';

// import { Calendar } from './Calendar';
// import { CalendarTheme } from './CalendarTheme';

// import { colors } from '../../../constants';

// const CalendarMeta: ComponentMeta<typeof Calendar> = {
//   title: 'Components/Calendar',
//   component: Calendar,
//   argTypes: {
//     onDayPressed: { action: 'clicked' },
//   },
// };

// export default CalendarMeta;

// const selectedDay = moment().subtract(1, 'd');

// type CalendarStory = ComponentStory<typeof Calendar>;
// export const Basic: CalendarStory = args => <Calendar {...args} />;
// Basic.args = {
//   selectedDay,
//   hideArrows: true,
// };

// const markedDays = [
//   moment().subtract(1, 'd').format('YYYY-MM-DD'),
//   moment().add('D').format('YYYY-MM-DD'),
// ];

// export const MarkedStringDays: CalendarStory = args => <Calendar {...args} />;
// MarkedStringDays.args = {
//   ...Basic.args,
//   markedDays,
// };

// export const MarkedDateDays: CalendarStory = args => <Calendar {...args} />;
// MarkedDateDays.args = {
//   ...Basic.args,
//   markedDays: markedDays.map(day => new Date(day)),
// };

// export const MarkedMomentDays: CalendarStory = args => <Calendar {...args} />;
// MarkedMomentDays.args = {
//   ...Basic.args,
//   markedDays: markedDays.map(day => moment(day)),
// };

// const accentColor = colors.accentBasic;
// const backgroundColor = colors.background;
// const textColor = colors.textBlack;
// const textLightColor = colors.textGray;

// const calendarTheme: CalendarTheme = {
//   backgroundColor,
//   indicatorColor: accentColor,
//   textColor,
//   textLightColor,
//   selectedDayBackgroundColor: accentColor,
//   dotColor: accentColor,
//   arrowColor: accentColor,
//   todayTextColor: accentColor,
// };

// export const CustomTheme: CalendarStory = args => <Calendar {...args} />;
// CustomTheme.args = {
//   ...Basic.args,
//   theme: calendarTheme,
// };

// export const HideArrows: CalendarStory = args => <Calendar {...args} />;
// HideArrows.args = {
//   ...Basic.args,
//   hideArrows: true,
// };
