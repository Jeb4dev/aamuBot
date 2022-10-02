import { EmbedField } from 'discord.js';

import type { ICommand } from '../interfaces';
import { isRegistered } from '../requirements/isRegistered';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user';
import { UsersService } from '../services/users-service';

export const Command: ICommand = {
  name: 'skills',
  description: 'Shows your skills',
  requirements: [isRegistered],
  async execute(client, interaction) {
    const usersService = new UsersService();
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersService.findById(interaction.user.id);

    console.log(user);
    const playerSkills = user?.selectedProfile?.profile?.skills || [];

    const fields: EmbedField[] = playerSkills
      .map((skill) => ({
        name: `${skill.skill.emoji} ${skill.skill.name}`,
        value: formatSkill(skill),
        inline: true,
        skill: skill.skill,
      }))
      .sort((a, b) => {
        if (a.skill.name < b.skill.name) return -1;
        else if (a.skill.name === b.skill.name) return 0;
        return 1;
      });

    const embeddedMsg = {
      color: 0x00aaaa,
      author: {
        name: `${user?.selectedProfile?.profile?.label || 'N/A'}'s skills`,
        icon_url: interaction.user.avatarURL() + '',
      },
      fields: fields,
    };

    await interaction.reply({ embeds: [embeddedMsg] });
  },
};
