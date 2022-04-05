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
  selected: Plant | null;
}

const initialState: PlantState = {
  plants: [
    {
      nickname: "Monstera",
      name: "Monstera deliciosa",
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
      name: "Dracaena marginata",
      id: "15",
      photoUrl: "https://source.unsplash.com/1600x900/?dracaena",
    },
    {
      nickname: "Monstera",
      name: "Monstera deliciosa",
      id: "23",
      photoUrl: "https://source.unsplash.com/2600x900/?monstera",
    },
    {
      nickname: "Aloe",
      id: "22",
      photoUrl: "https://source.unsplash.com/2600x900/?aloe+vera",
    },
    {
      nickname: "Sansevieria",
      id: "24",
      photoUrl: "https://source.unsplash.com/2600x900/?sansevieria",
    },
    {
      nickname: "Dracaena",
      name: "Dracaena marginata",
      id: "25",
      photoUrl: "https://source.unsplash.com/2600x900/?dracaena",
    },
    {
      nickname: "Monstera",
      name: "Monstera deliciosa",
      id: "33",
      photoUrl: "https://source.unsplash.com/3600x900/?monstera",
    },
    {
      nickname: "Aloe",
      id: "32",
      photoUrl: "https://source.unsplash.com/3600x900/?aloe+vera",
    },
    {
      nickname: "Sansevieria",
      id: "34",
      photoUrl: "https://source.unsplash.com/3600x900/?sansevieria",
    },
    {
      nickname: "Dracaena",
      name: "Dracaena marginata",
      id: "35",
      photoUrl: "https://source.unsplash.com/3600x900/?dracaena",
    },
  ],
  selected: null,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    addPlant: (state, action: PayloadAction<Plant>) => {
      state.plants.push(action.payload);
    },
    removePlant: (state, action: PayloadAction<string>) => {
      state.plants = state.plants.filter(
        (plant) => plant.id !== action.payload
      );
    },
  },
});

export const { addPlant, removePlant } = plantSlice.actions;

export const selectPlants = (state: RootState) => state.plantReducer.plants;
export const selectPlantById = (state: RootState, id: string): Plant =>
  state.plantReducer.plants.filter((plant) => plant.id === id)[0] || undefined;

export default plantSlice.reducer;
