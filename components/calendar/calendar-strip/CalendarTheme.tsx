export interface CalendarTheme {
  backgroundColor?: string;
  textColor?: string;
  textLightColor: string;
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
  textLightColor: 'grey',
  selectedDayBackgroundColor: 'green',
  dotColor: 'green',
  arrowColor: 'green',
  todayTextColor: 'green',
};
