import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';

export const Command: ICommand = {
  name: 'register',
  description: 'Register to bot user with discord ID',
  async execute(client, interaction) {
    const userRepository = AppDataSource.getRepository(User);

    const userId = interaction.user.id;
    let user = await userRepository.findOneBy({
      id: userId,
    });
    if (user) {
      await interaction.reply(`Welcome back <@${user.id}>!`);
    } else {
      user = new User();
      user.id = userId;
      await userRepository.save(user);
      await interaction.reply(`Welcome <@${user.id}>!`);
    }
  },
};
