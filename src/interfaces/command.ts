import type { SlashCommandBuilder, ChatInputCommandInteraction, Client } from 'discord.js';

export interface ICommand {
  name: string;
  description: string;
  buildCommand?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
  execute: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>;
}
