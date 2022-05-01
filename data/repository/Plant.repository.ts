import { Connection, getRepository, Repository } from 'typeorm';
import { PlantModel } from '../../model';
import { PlantEntity } from '../entities/Plant.entity';

export class PlantRepository {
  private ormRepository: Repository<PlantEntity>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(PlantEntity);
  }

  public async getAll(): Promise<PlantEntity[]> {
    const plants = await this.ormRepository.find();
    return plants;
  }

  public async create(
    plant: Omit<PlantModel, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PlantEntity> {
    const createdPlant = await this.ormRepository.save(plant);
    return createdPlant;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
