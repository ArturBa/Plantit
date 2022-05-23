/* eslint-disable import/no-cycle */
import { Column, Entity, JoinColumn, ManyToMany } from 'typeorm';
import { ActionModel, PlantModel } from '../../model';
import { AbstractEntity } from './internal/Abstract.entity';
import { PlantEntity } from './Plant.entity';

@Entity({ name: 'actions' })
export class ActionEntity extends AbstractEntity implements ActionModel {
  @Column()
  plantId: number;

  @ManyToMany(type => PlantEntity, plant => plant.actions)
  @JoinColumn({ name: 'plantId' })
  plant: PlantModel;

  @Column()
  type: string;

  @Column({
    type: 'integer',
  })
  frequency: number;

  @Column()
  period: string;
}
