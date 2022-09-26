import type { ICommand } from '../interfaces';

export const Command: ICommand = {
  name: 'ping',
  description: 'Responds with latency between bot and discord servers.',
  async execute(client, interaction) {
    const ping = new Date().getTime() - interaction.createdTimestamp;
    await interaction.reply(':ping_pong: ' + ping + 'ms');
  },
};
