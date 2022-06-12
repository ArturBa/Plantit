import { Column, Entity } from 'typeorm';

import { BaseEntity } from './Base.entity';

import { PlantModel } from '../../model';

@Entity({ name: 'plants' })
export class PlantEntity extends BaseEntity implements PlantModel {
  @Column({
    nullable: true,
  })
  name: string | undefined;

  @Column()
  nickname: string;

  @Column()
  photoUrl: string;
}
