import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Action {
  done: boolean;
  plant: string;
  type: string;
  id: string;
}
interface CalendarState {
  actionDays: string[];
  selectedDay: string;
  actions: Action[];
}

const initialState: CalendarState = {
  actionDays: ["2022-04-15", "2022-04-16", "2022-04-22", "2022-04-21"],
  selectedDay: "",
  actions: [
    {
      id: "57510",
      type: "Water",
      done: false,
      plant: "13",
    },
    {
      id: "57511",
      type: "Facile",
      done: false,
      plant: "13",
    },
    {
      id: "57512",
      type: "Water",
      done: false,
      plant: "12",
    },
  ],
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

export const selectActionDays = (state: RootState): string[] =>
  state.calendarReducer.actionDays;
export const selectSelectedDay = (state: RootState): string =>
  state.calendarReducer.selectedDay;
export const selectActions = (state: RootState): Action[] =>
  state.calendarReducer.actions;
export const selectActionIds = (state: RootState): string[] =>
  state.calendarReducer.actions.reduce((prev: string[], next: Action) => {
    const array = [...prev];
    array.push(next.id);
    return array;
  }, []);
export const selectActionsByPlantId = (
  state: RootState,
  id: string
): Action[] =>
  state.calendarReducer.actions.filter((action) => action.plant === id);

export default calendarSlice.reducer;
