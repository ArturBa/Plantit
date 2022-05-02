import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Action {
  done: boolean;
  plant: number;
  type: string;
  id: number;
}
interface CalendarState {
  actionDays: string[];
  selectedDay: string;
  actions: Action[];
}

const initialState: CalendarState = {
  actionDays: ['2022-04-15', '2022-04-16', '2022-04-22', '2022-04-21'],
  selectedDay: '',
  actions: [
    {
      id: 57511,
      type: 'Facile',
      done: false,
      plant: 1,
    },
    {
      id: 57542,
      type: 'Water',
      done: false,
      plant: 1,
    },
  ],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    },
    setActionStatus: (
      state,
      action: PayloadAction<{ id: number; done: boolean }>,
    ) => {
      const index = state.actions.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.actions[index].done = action.payload.done;
      }
    },
  },
});

export const { setCurrentDay, setActionStatus } = calendarSlice.actions;

export const selectActionDays = (state: RootState): string[] =>
  state.calendarReducer.actionDays;
export const selectSelectedDay = (state: RootState): string =>
  state.calendarReducer.selectedDay;
export const selectActions = (state: RootState): Action[] =>
  state.calendarReducer.actions;
export const selectActionIds = (state: RootState): number[] =>
  state.calendarReducer.actions.reduce((prev: number[], next: Action) => {
    const array = [...prev];
    array.push(next.id);
    return array;
  }, []);
export const selectActionsByPlantId = (
  state: RootState,
  id: number,
): Action[] =>
  state.calendarReducer.actions.filter(action => action.plant === id);

export default calendarSlice.reducer;
