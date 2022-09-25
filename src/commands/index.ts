import { REST, Routes } from 'discord.js';
import { getEnv } from '../env';

const commands = [
  {
    name: 'ping',
    description: 'test command',
  },
];

export const rest = new REST({ version: '10' }).setToken(getEnv('TOKEN'));

export const initCommands = async () => {
  try {
    console.log('Started');
    await rest.put(Routes.applicationCommands(getEnv('CLIENT_ID')), { body: commands });
  } catch (e) {}
};
