import { PlantModel } from './Plant.model';

export interface ActionModel {
  id: number;
  plant: PlantModel;
  type: string;
  frequency: number;
  period: string;
}
