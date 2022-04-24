import { Connection, getRepository, Repository } from 'typeorm';
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
}
