// pog summon VLYK

import type { ICommand } from '../interfaces';
import { channel } from 'diagnostics_channel';

export const Command: ICommand = {
  name: 'summon',
  description: 'Summon a person, role or daddy',
  buildCommand: (builder) =>
    builder
      .addStringOption((option) =>
        option.setName('message').setDescription('The message which will be spammed').setRequired(true),
      )
      .addUserOption((option) =>
        option.setName('user').setDescription('The user which will be summoned').setRequired(true),
      )
      .addIntegerOption((option) =>
        option.setName('count').setDescription('The amount of spam which will be sent').setRequired(true),
      ),
  async execute(client, interaction) {
    const msg = interaction.options.getString('message')!.trim();
    const user = interaction.options.getUser('user')!;
    let count = interaction.options.getInteger('count')!;
    if (count > 10) {
      count = 10;
    }
    await interaction.reply('Started');
    await Promise.all(
      Array.from(Array(count)).map(async () => {
        const reply = await interaction.channel?.send(`${msg} <@${user.id}>`);
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (reply) resolve(reply.delete());
            else reject('reply is undefined');
          }, 3000);
        });
      }),
    );
    await interaction.deleteReply();
  },
}; // walrus ^
