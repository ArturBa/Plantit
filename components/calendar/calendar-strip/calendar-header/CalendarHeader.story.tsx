import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import moment from 'moment';

import { CalendarHeader } from './CalendarHeader';

import { colors } from '../../../../constants';
import { CustomCalendarTheme } from '../../CalendarWrapper.helpers';

// const CalendarHeaderMeta: ComponentMeta<typeof CalendarHeader> = {
//   title: 'Components/Calendar/Header',
//   component: CalendarHeader,
//   argTypes: {
//     nextWeek: { action: 'clicked next week' },
//     prevWeek: { action: 'clicked prev week' },
//   },
// };
// export default CalendarHederMeta;

// type CalendarHeaderStory = ComponentStory<typeof CalendarHeader>;
// export const Basic: CalendarHeaderStory = args => <CalendarHeader {...args} />;
// Basic.args = {
//   middleWeekDate: moment(),
//   hideArrows: true,
// };

// const calendarTheme = CustomCalendarTheme(colors);

// export const CustomTheme: CalendarHeaderStory = args => (
//   <CalendarHeader {...args} />
// );
// CustomTheme.args = {
//   ...Basic.args,
//   theme: calendarTheme,
// };

// export const HideArrows: CalendarHeaderStory = args => (
//   <CalendarHeader {...args} />
// );
// HideArrows.args = {
//   ...Basic.args,
//   hideArrows: true,
// };
