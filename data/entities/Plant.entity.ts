import { Column, Entity } from 'typeorm';
import { PlantModel } from '../../model';
import { BaseEntity } from './Base.entity';

@Entity({ name: 'Plant' })
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
