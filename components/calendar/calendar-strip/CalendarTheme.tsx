export interface CalendarTheme {
  backgroundColor?: string;
  textColor?: string;
  indicatorColor?: string;
  selectedDayBackgroundColor?: string;
  dotColor?: string;
  arrowColor?: string;
  todayTextColor?: string;
}

export const defaultTheme: CalendarTheme = {
  backgroundColor: 'white',
  indicatorColor: 'green',
  textColor: 'black',
  selectedDayBackgroundColor: 'green',
  dotColor: 'green',
  arrowColor: 'green',
  todayTextColor: 'green',
};
