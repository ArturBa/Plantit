import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CalendarState {
  actionDays: string[];
  selectedDay: string;
}

const initialState: CalendarState = {
  actionDays: ["2022-04-15", "2022-04-16", "2022-04-22", "2022-04-21"],
  selectedDay: "2022-04-10",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCurrentDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
  },
});

export const { setCurrentDay } = calendarSlice.actions;

export const selectActionDays = (state: RootState) =>
  state.calendarReducer.actionDays;
export const selectSelectedDay = (state: RootState) =>
  state.calendarReducer.selectedDay;

export default calendarSlice.reducer;
