import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '../data-source';

export class RepositoryService<Entity extends ObjectLiteral> {
  protected readonly repository: Repository<Entity>;

  constructor(target: EntityTarget<Entity>) {
    this.repository = AppDataSource.getRepository(target);
  }
}
