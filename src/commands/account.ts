import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';

export const Command: ICommand = {
  name: 'account',
  description: 'Show account information',
  async execute(client, interaction) {
    const usersRepository = AppDataSource.getRepository(User);

    const userId = interaction.user.id;
    let user = await usersRepository.findOneBy({
      id: userId,
    });
    if (user) {
      await interaction.reply(
        ['Account Information:', `Registered: <@${user.createdOn}>!`, `Updated: <@${user.updatedOn}>!`].join('\n\t'),
      );
    } else {
      await interaction.reply(`No account found!`);
    }
  },
};
