import type { SlashCommandBuilder, ChatInputCommandInteraction, Client, Interaction } from 'discord.js';

export type Requirement = (client: Client, interaction: ChatInputCommandInteraction) => Promise<boolean>;

export interface ICommand {
  name: string;
  description: string;
  buildCommand?: (builder: SlashCommandBuilder) => SlashCommandBuilder;
  requirements?: Requirement[];
  execute: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void>;
}
