import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';
import { isRegistered } from '../requirements/isRegistered';
import { PlayerSkill } from '../entities/playerSkill';

const formatSkill = (skill: PlayerSkill): string =>
  `${skill.skill.emoji} ${skill.skill.name}: ${skill.level} level - ${skill.experience}/${skill.skill.experienceForLevel} for next level`;

export const Command: ICommand = {
  name: 'skills',
  description: 'Shows your skills',
  requirements: [isRegistered],
  async execute(client, interaction) {
    const userRepository = AppDataSource.getRepository(User);
    const skills = (await userRepository.findOneBy({ id: interaction.user.id }))?.skills || [];
    await interaction.reply(['Skills:', ...skills.map(formatSkill)].join('\n'));
  },
};
