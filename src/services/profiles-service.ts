import { RepositoryService } from './index';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { PlayerSkillsService } from './player-skills-service';
import { WalletsService } from './wallets-service';

export class ProfilesService extends RepositoryService<Profile> {
  constructor(private playerSkillsService = new PlayerSkillsService(), private walletsService = new WalletsService()) {
    super(Profile);
  }

  async create(user: User, label: string): Promise<Profile> {
    const profile = await this.repository.save(
      this.repository.create({
        user,
        label,
      }),
    );
    await this.playerSkillsService.create(profile);
    await this.walletsService.create(profile);
    await this.repository.save(profile);
    return profile;
  }
}
