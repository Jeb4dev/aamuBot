import { RepositoryService } from './index';
import { ProfilesService } from './profiles-service';
import { User } from '../entities/user';
import { SelectedProfilesService } from './selected-profiles-service';

export class UsersService extends RepositoryService<User> {
  constructor(
    public profileService = new ProfilesService(),
    public selectedProfileService = new SelectedProfilesService(),
  ) {
    super(User);
  }

  async create(userId: string): Promise<User> {
    const user = await this.repository.save(
      this.repository.create({
        id: userId,
      }),
    );

    const profile = await this.profileService.create(user, 'default');
    await this.selectedProfileService.create(user, profile);
    return user;
  }

  async findById(userId: string, loadRelations = true): Promise<User | null> {
    return this.repository.findOne({
      relations: loadRelations
        ? {
            selectedProfile: {
              profile: {
                skills: {
                  skill: true,
                },
                wallet: true,
              },
            },
          }
        : {},
      where: {
        id: userId,
      },
    });
  }
}
