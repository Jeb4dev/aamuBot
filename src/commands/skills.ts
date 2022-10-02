import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';
import { isRegistered } from '../requirements/isRegistered';
import { PlayerSkill } from '../entities/player-skill';
import { EmbedField } from 'discord.js';
import { SelectedProfile } from '../entities/selected-profile';
import { Profile } from '../entities/profile';
import { Skill } from '../entities/skill';

export const Command: ICommand = {
  name: 'skills',
  description: 'Shows your skills',
  requirements: [isRegistered],
  async execute(client, interaction) {
    const user: User | null = await getUserById(interaction.user.id);
    console.log(user);
    let fields: EmbedField[] = [];
    if (user?.id) {
      const profile: Profile | null = await getSelectedProfileByUserId(user?.id);
      const playerSkills: PlayerSkill[] = profile?.skills || [];

      for (let key in playerSkills) {
        fields.push({
          name: playerSkills[key].skill.name,
          value: playerSkills[key].skill.emoji,
          inline: true,
        });
      }
    }

    const embeddedMsg = {
      color: 0x00aaaa,
      author: {
        name: interaction.user.tag,
        icon_url: interaction.user.avatarURL() + '',
      },
      description: `${interaction.user.tag}'s skills`,
      fields: fields,
    };

    await interaction.reply({ embeds: [embeddedMsg] });
  },
};

async function getUserById(userId: string) {
  // returns user object from database
  const usersRepository = AppDataSource.getRepository(User);

  return await usersRepository.findOneBy({
    id: userId,
  });
}

async function getSelectedProfileByUserId(userId: string) {
  // returns profile object from database

  // Find User
  const usersRepository = AppDataSource.getRepository(User);
  let user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  // Find SelectedProfile
  const selectedProfileRepository = AppDataSource.getRepository(SelectedProfile);

  let selectedProfile: SelectedProfile | null = await selectedProfileRepository.findOneBy({
    user: user,
  });

  // Find Profile
  const profileRepository = AppDataSource.getRepository(Profile);
  let profile: Profile | null = await profileRepository.findOneBy({ id: selectedProfile?.profile });

  return profile;
}

async function getSkillById(profile: Profile) {
  const skillRepository = AppDataSource.getRepository(Skill);
  return await skillRepository.findOneBy({ id: profile?.id });
}
