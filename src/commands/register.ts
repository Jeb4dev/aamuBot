import type { ICommand } from '../interfaces';
import { UsersService } from '../services/users-service';

export const Command: ICommand = {
  name: 'register',
  description: 'Register to bot user with discord ID',
  async execute(client, interaction) {
    const usersService = new UsersService();

    const userId = interaction.user.id;
    let user = await usersService.findById(userId, false);
    if (user) {
      await interaction.reply(`Welcome back <@${userId}>!`);
      console.log(user);
    } else {
      user = await usersService.create(userId);
      console.log(user);
      await interaction.reply(`Welcome <@${user.id}>!`);
    }
  },
};
