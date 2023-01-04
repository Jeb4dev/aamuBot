import type { ICommand } from '../interfaces';

export const Command: ICommand = {
  name: 'version',
  description: 'Responds with the version of bot.',
  async execute(client, interaction) {
    await interaction.reply(':sunrise: AamuBot v1.2.0 \nUpdated on 04/01/2023');
  },
};