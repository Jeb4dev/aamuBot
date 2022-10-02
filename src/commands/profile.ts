import { APIEmbed } from 'discord.js';
import type { ICommand } from '../interfaces';
import { UsersService } from '../services/users-service';
import { isRegistered } from '../requirements/isRegistered';

export const Command: ICommand = {
  name: 'profile',
  description: 'Show profile information such as skills and wallet',
  requirements: [isRegistered],
  async execute(client, interaction) {
    const usersService = new UsersService();

    const user = (await usersService.findById(interaction.user.id))!;
    const wallet = user.selectedProfile.profile.wallet;

    const profileEmbed: APIEmbed = {
      color: 0xaa00aa,
      author: {
        name: interaction.user.tag,
        icon_url: interaction.user.avatarURL() + '',
      },
      description: user?.selectedProfile.profile.label || 'Unknown profile',
      thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/1023630751855542322/1025820784112975882/walroos.png',
      },
      fields: [
        {
          name: 'Wallet',
          value: ':moneybag:',
        },
        {
          name: 'Gold',
          value: wallet.gold + '',
          inline: true,
        },
        {
          name: 'Silver',
          value: wallet.silver + '',
          inline: true,
        },
        {
          name: 'Bronze',
          value: wallet.bronze + '',
          inline: true,
        },
        // {
        //   name: 'Skills',
        //   value: 'Skills allow you to do stuff faster and more effectively.',
        // },
        // {
        //   name: 'Hunting',
        //   value: 'level 1',
        //   inline: true,
        // },
        // {
        //   name: 'Fishing',
        //   value: 'level: 12',
        //   inline: true,
        // },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'walrus statistics ltd.',
        icon_url: 'https://cdn.discordapp.com/attachments/1023630751855542322/1025820784112975882/walroos.png',
      },
    };

    await interaction.reply({ embeds: [profileEmbed] });
  },
};
