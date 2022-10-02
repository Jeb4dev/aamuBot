import { RepositoryService } from './index';
import { Wallet } from '../entities/wallet';
import { Profile } from '../entities/profile';

export class WalletsService extends RepositoryService<Wallet> {
  constructor() {
    super(Wallet);
  }

  async create(profile: Profile): Promise<Wallet> {
    const wallet = this.repository.create({
      profile,
    });
    await this.repository.save(wallet);
    return wallet;
  }
}
