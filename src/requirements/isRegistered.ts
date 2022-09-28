import type { Requirement } from '../interfaces/command';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';

export const isRegistered: Requirement = async (client, interaction) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({
    id: interaction.user.id,
  });
  if (!user) {
    await interaction.reply('`/register` before performing this action');
    return false;
  }
  return true;
};
