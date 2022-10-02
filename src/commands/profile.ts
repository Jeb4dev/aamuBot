import type { ICommand } from '../interfaces';

export const Command: ICommand = {
  name: 'profile',
  description: 'Show profile information such as skills and wallet',
  async execute(client, interaction) {
    const exampleEmbed = {
      color: 0xaa00aa,
      author: {
        name: interaction.user.tag,
        icon_url: interaction.user.avatarURL() + '',
      },
      description: 'Show profile information such as skills and wallet',
      thumbnail: {
        url: 'https://cdn.discordapp.com/attachments/1023630751855542322/1025820784112975882/walroos.png',
      },
      fields: [
        {
          name: 'Wallet',
          value: 'Buy food with silver, or?',
        },
        {
          name: 'Gold',
          value: '1',
          inline: true,
        },
        {
          name: 'Silver',
          value: '25',
          inline: true,
        },
        {
          name: 'Bronze',
          value: '230',
          inline: true,
        },
        {
          name: 'Skills',
          value: 'Skills allow you to do stuff faster and more effectively.',
        },
        {
          name: 'Hunting',
          value: 'level 1',
          inline: true,
        },
        {
          name: 'Fishing',
          value: 'level: 12',
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'walrus statistics ltd.',
        icon_url: 'https://cdn.discordapp.com/attachments/1023630751855542322/1025820784112975882/walroos.png',
      },
    };

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
