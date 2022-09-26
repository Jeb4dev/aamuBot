import Bot from './client';
import { GatewayIntentBits } from 'discord.js';

const bot = new Bot({ intents: [GatewayIntentBits.Guilds] });

bot.run();
