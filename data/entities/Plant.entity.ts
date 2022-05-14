/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToMany } from 'typeorm';
import { ActionModel, PlantModel } from '../../model';
import { AbstractEntity } from './internal/Abstract.entity';
import { ActionEntity } from './Action.entity';

@Entity({ name: 'plants' })
export class PlantEntity extends AbstractEntity implements PlantModel {
  @Column({
    nullable: true,
  })
  name: string | undefined;

  @Column()
  nickname: string;

  @Column()
  photoUrl: string;

  @ManyToMany(type => ActionEntity, action => action.plantId)
  actions: ActionModel[];
}
