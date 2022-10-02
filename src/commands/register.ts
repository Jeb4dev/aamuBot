import type { ICommand } from '../interfaces';
import { User } from '../entities/user';
import { AppDataSource } from '../data-source';
import { Profile } from '../entities/profile';
import { Wallet } from '../entities/wallet';
import { PlayerSkill } from '../entities/player-skill';
import { Skill } from '../entities/skill';
import { SelectedProfile } from '../entities/selected-profile';

export const Command: ICommand = {
  name: 'register',
  description: 'Register to bot user with discord ID',
  async execute(client, interaction) {
    const usersRepository = AppDataSource.getRepository(User);

    const userId = interaction.user.id;
    let user = await usersRepository.findOneBy({
      id: userId,
    });
    if (user) {
      await interaction.reply(`Welcome back <@${user.id}>!`);
      console.log(user);
    } else {
      user = await createUser(userId);
      let profile = await createProfile(user);
      await createSelectedProfile(user, profile);
      console.log(user);
      await interaction.reply(`Welcome <@${user.id}>!`);
    }
  },
};

async function createUser(userId: string) {
  const userRepository = AppDataSource.getRepository(User);
  let user = userRepository.create({ id: userId });
  await createProfile(user);
  return user;
}

async function createSelectedProfile(user: User, profile: Profile) {
  const selectedProfileRepository = AppDataSource.getRepository(SelectedProfile);
  let selectedProfile = selectedProfileRepository.create({ user: user, profile: profile });
  await selectedProfileRepository.save(selectedProfile);
  return selectedProfile;
}

async function createProfile(user: User) {
  const profileRepository = AppDataSource.getRepository(Profile);
  let profile = profileRepository.create({ user: user });
  profile.label = 'Test Profile'; // TODO: Ask user for profile label
  await profileRepository.save(profile);

  console.warn('This is here', profile);
  await createWallet(profile);
  await createPlayerSkills(profile);
  console.warn('This is there', profile);
  return profile;
}

async function createWallet(profile: Profile) {
  const walletRepository = AppDataSource.getRepository(Wallet);
  let wallet = walletRepository.create({ profile: profile });
  await walletRepository.save(wallet);
  return wallet;
}

async function createPlayerSkills(profile: Profile) {
  const playerSkillRepository = AppDataSource.getRepository(PlayerSkill);
  const availableSkillsRepository = AppDataSource.getRepository(Skill);

  let availableSkills: Skill[] = await availableSkillsRepository.find();

  for (let key in availableSkills) {
    let playerSkills = playerSkillRepository.create({ profile: profile, skill: availableSkills[key] });
    await playerSkillRepository.save(playerSkills);
  }
}
