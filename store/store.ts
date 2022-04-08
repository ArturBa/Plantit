import { configureStore } from "@reduxjs/toolkit";

import calendarReducer from "./calendar.slice";
import plantReducer, { getPlantsFromDb } from "./plant.slice";

// TODO: check while is recognized wrongly
const isDevelopment = true; // process.env["NODE_ENV"] === "development";

const reducer = {
  calendarReducer,
  plantReducer,
};

const store = configureStore({ reducer, devTools: isDevelopment });

export function configureAppStore() {
  getPlantsFromDb();
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
