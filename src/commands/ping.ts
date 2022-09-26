import type { ICommand } from '../interfaces';

export const Command: ICommand = {
  name: 'ping',
  description: 'Says pong',
  async execute(client, interaction) {
    await interaction.reply('Pong');
  },
};
