import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatabaseContext } from '../data/config/ConnectionProvider';

import { PlantModel } from '../model';
import type { RootState } from './store';

interface PlantState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  plants: PlantModel[];
  visiblePlants: number;
}

const initialState: PlantState = {
  status: 'idle',
  visiblePlants: 20,
  plants: [
    {
      nickname: 'Monstera',
      name: 'Monstera deliciosa',
      id: 13,
      photoUrl: 'https://source.unsplash.com/1600x900/?monstera',
    },
    {
      nickname: 'Aloe',
      id: 12,
      photoUrl: 'https://source.unsplash.com/1600x900/?aloe+vera',
    },
    {
      nickname: 'Sansevieria',
      id: 14,
      photoUrl: 'https://source.unsplash.com/1600x900/?sansevieria',
    },
    {
      nickname: 'Dracaena',
      name: 'Dracaena marginata',
      id: 15,
      photoUrl: 'https://source.unsplash.com/1600x900/?dracaena',
    },
  ],
};

export const addPlant = createAsyncThunk(
  'plant/addPlantAsync',
  async (plant: Omit<PlantModel, 'id'>): Promise<PlantModel> => {
    const returnValue: PlantModel = {
      ...plant,
      id: 0,
    };

    const { plantsRepository } = await DatabaseContext.getContext();
    const plantEntity = await plantsRepository.create(plant);
    returnValue.id = plantEntity.id;
    return returnValue;
  },
);

export const removePlant = createAsyncThunk(
  'plant/removePlantAsync',
  async (plantId: number): Promise<number> => {
    const { plantsRepository } = await DatabaseContext.getContext();
    await plantsRepository.delete(plantId);
    return plantId;
  },
);

export const getPlants = createAsyncThunk(
  'plant/getPlantsAsync',
  async (): Promise<PlantModel[]> => {
    const { plantsRepository } = await DatabaseContext.getContext();
    const plants = await plantsRepository.getAll();
    return plants.map(p => ({
      id: p.id,
      nickname: p.nickname,
      name: p.name,
      photoUrl: p.photoUrl,
    }));
  },
);

export const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    updatePlant: (state, action: PayloadAction<PlantModel>) => {
      const plantIndex = state.plants.findIndex(
        p => p.id === action.payload.id,
      );
      if (plantIndex !== -1) {
        state.plants[plantIndex] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addPlant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        addPlant.fulfilled,
        (state, action: PayloadAction<PlantModel>) => {
          state.plants.push(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(
        removePlant.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.plants = state.plants.filter(
            plant => plant.id !== action.payload,
          );
          state.status = 'succeeded';
        },
      )
      .addCase(
        getPlants.fulfilled,
        (state, action: PayloadAction<PlantModel[]>) => {
          state.plants = action.payload;
          state.status = 'succeeded';
        },
      );
  },
});

export const { updatePlant } = plantSlice.actions;

export const selectPlants = (state: RootState) => state.plantReducer.plants;
export const selectPlantById = (state: RootState, id: number): PlantModel =>
  state.plantReducer.plants.filter(plant => plant.id === id)[0] || undefined;

// export const plantReducer = plantSlice.reducer;
export default plantSlice.reducer;
