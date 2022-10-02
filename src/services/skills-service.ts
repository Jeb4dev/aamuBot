import { RepositoryService } from './index';
import { Skill } from '../entities/skill';

export class SkillsService extends RepositoryService<Skill> {
  constructor() {
    super(Skill);
  }

  async getSkills(): Promise<Skill[]> {
    return await this.repository.find();
  }
}
