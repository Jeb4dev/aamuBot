import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';

export const Command: ICommand = {
  name: 'register',
  description: 'Register to bot user with discord ID',
  async execute(client, interaction) {
    const usersRepository = AppDataSource.getRepository(User);

    const userId = interaction.user.id;
    let user = await usersRepository.findOneBy({
      id: userId,
    });
    if (user) {
      await interaction.reply(`Welcome back <@${user.id}>!`);
    } else {
      user = usersRepository.create({
        id: userId,
      });
      await usersRepository.save(user);
      await interaction.reply(`Welcome <@${user.id}>!`);
    }
  },
};
