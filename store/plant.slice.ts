import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { DbContext, Plant, PlantsTableName } from "../database";

export interface PlantInterface {
  nickname: string;
  name?: string;
  id: number;
  photoUrl: string;
}

interface PlantState {
  state: "idle" | "loading" | "error" | "success";
  plants: PlantInterface[];
}

const initialState: PlantState = {
  state: "idle",
  plants: [],
};

const db = new DbContext().database;

export const getPlantsFromDb = async () => {
  const plants = await db.query<Plant>(PlantsTableName).toList();
  console.log("plants", plants);
  plantSlice.actions.setPlants(plants);
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    addPlant: (state, action: PayloadAction<PlantInterface>) => {
      state.state = "loading";
      state.plants.push(action.payload);
      db.save(new Plant(action.payload));
      state.state = "success";
    },
    setPlants: (state, action: PayloadAction<PlantInterface[]>) => {
      state.plants = action.payload;
      state.state = "success";
    },
    updatePlant: (state, action: PayloadAction<PlantInterface>) => {
      const plantIndex = state.plants.findIndex(
        (p) => p.id === action.payload.id
      );
      if (plantIndex === -1) {
        state.state = "error";
        return;
      }
      state.plants[plantIndex] = action.payload;
      state.state = "success";
    },
    removePlant: (state, action: PayloadAction<number>) => {
      state.plants = state.plants.filter(
        (plant) => plant.id !== action.payload
      );
      state.state = "success";
    },
  },
});

export const { addPlant, updatePlant, removePlant } = plantSlice.actions;

export const selectPlants = (state: RootState) => state.plantReducer.plants;
export const selectPlantById = (state: RootState, id: number): PlantInterface =>
  state.plantReducer.plants.filter((plant) => plant.id === id)[0] || undefined;

export default plantSlice.reducer;
