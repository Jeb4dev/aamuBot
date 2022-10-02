import { RepositoryService } from './index';
import { SelectedProfile } from '../entities/selected-profile';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';

export class SelectedProfilesService extends RepositoryService<SelectedProfile> {
  constructor() {
    super(SelectedProfile);
  }

  async create(user: User, profile: Profile): Promise<SelectedProfile> {
    return await this.repository.save(
      this.repository.create({
        user,
        profile,
      }),
    );
  }
}
