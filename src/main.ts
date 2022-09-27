import { GatewayIntentBits } from 'discord.js';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import Bot from './client';

const bot = new Bot({ intents: [GatewayIntentBits.Guilds] });

(async () => {
  await AppDataSource.initialize();
  await bot.run();
})();
