import { CalendarTheme } from './calendar-strip';

import { Colors } from '../../constants';

export const CustomCalendarTheme = (colorScheme: Colors): CalendarTheme => ({
  backgroundColor: colorScheme.background,
  indicatorColor: colorScheme.accentBasic,
  textColor: colorScheme.textBlack,
  textLightColor: colorScheme.textGray,
  selectedDayBackgroundColor: colorScheme.accentBasic,
  dotColor: colorScheme.accentBasic,
  arrowColor: colorScheme.accentLight,
  todayTextColor: colorScheme.accentBasic,
});
