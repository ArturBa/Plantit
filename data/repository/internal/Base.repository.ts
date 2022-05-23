import { Connection, EntityTarget, getRepository, Repository } from 'typeorm';
import { AbstractEntity } from '../../entities/internal/Abstract.entity';

export abstract class AbstractRepository<Entity extends AbstractEntity> {
  protected abstract entity: EntityTarget<Entity>;

  protected ormRepository: Repository<Entity>;

  constructor(connection: Connection) {
    this.setOrmRepository(connection);
  }

  setOrmRepository(connection: Connection): void {
    this.ormRepository = connection.getRepository(this.entity);
  }

  public async getAll(): Promise<Entity[]> {
    const plants = await this.ormRepository.find();
    return plants;
  }

  public async create(
    modelData: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entity> {
    const createdEntity = await this.ormRepository.save(modelData);
    return createdEntity;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async getById(id: number): Promise<Entity | undefined> {
    const plant = await this.ormRepository.findOne(id);
    return plant;
  }

  public async update(modelData: Entity): Promise<Entity> {
    const updatedPlant = await this.ormRepository.save(modelData);
    return updatedPlant;
  }
}
