import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Plant {
  nickname: string;
  name?: string;
  id: string;
  photoUrl: string;
}

interface PlantState {
  plants: Plant[];
}

const initialState: PlantState = {
  plants: [
    {
      nickname: "Montera",
      name: "Montera",
      id: "13",
      photoUrl: "https://source.unsplash.com/1600x900/?monstera",
    },
    {
      nickname: "Aloe",
      id: "12",
      photoUrl: "https://source.unsplash.com/1600x900/?aloe+vera",
    },
    {
      nickname: "Sansevieria",
      id: "14",
      photoUrl: "https://source.unsplash.com/1600x900/?sansevieria",
    },
    {
      nickname: "Dracaena",
      id: "15",
      photoUrl: "https://source.unsplash.com/1600x900/?Dracaena",
    },
  ],
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
});

export const {} = plantSlice.actions;

export const selectPlantById = (state: RootState, id: string): Plant =>
  state.plantReducer.plants.filter((plant) => plant.id === id)[0] || undefined;

export default plantSlice.reducer;
