import { RepositoryService } from './index';
import { PlayerSkill } from '../entities/player-skill';
import { Profile } from '../entities/profile';
import { SkillsService } from './skills-service';

export class PlayerSkillsService extends RepositoryService<PlayerSkill> {
  constructor(private skillsService = new SkillsService()) {
    super(PlayerSkill);
  }

  async create(profile: Profile): Promise<PlayerSkill[]> {
    const playerSkills = (await this.skillsService.getSkills()).map((skill) =>
      this.repository.create({
        profile,
        skill,
        level: skill.minimumLevel,
      }),
    );

    await this.repository.save(playerSkills);
    return playerSkills;
  }
}
