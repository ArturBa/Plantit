import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

import { DatabaseContext } from '../data/config/ConnectionProvider';
import { PlantModel } from '../model';

export interface PlantState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  plants: PlantModel[];
}

const initialState: PlantState = {
  status: 'idle',
  plants: [],
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

export const updatePlant = createAsyncThunk(
  'plant/updatePlantAsync',
  async (plant: PlantModel): Promise<PlantModel> => {
    const returnValue: PlantModel = {
      ...plant,
    };

    const { plantsRepository } = await DatabaseContext.getContext();
    await plantsRepository.update(plant);
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
  reducers: {},
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
      .addCase(removePlant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        removePlant.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.plants = state.plants.filter(
            plant => plant.id !== action.payload,
          );
          state.status = 'succeeded';
        },
      )
      .addCase(getPlants.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        getPlants.fulfilled,
        (state, action: PayloadAction<PlantModel[]>) => {
          state.plants = action.payload;
          state.status = 'succeeded';
        },
      )
      .addCase(updatePlant.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        updatePlant.fulfilled,
        (state, action: PayloadAction<PlantModel>) => {
          const plantIndex = state.plants.findIndex(
            p => p.id === action.payload.id,
          );
          if (plantIndex !== -1) {
            state.plants[plantIndex] = action.payload;
          }
          state.status = 'succeeded';
        },
      );
  },
});

export const selectPlants = (state: RootState) => state.plantReducer.plants;
export const selectPlantById = (state: RootState, id: number): PlantModel =>
  state.plantReducer.plants.filter(plant => plant.id === id)[0] || undefined;

export default plantSlice.reducer;
