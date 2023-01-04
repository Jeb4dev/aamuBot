import type { ICommand } from '../interfaces';
import {runNow} from "../jobs";

const admins = ["368862359562747916"]

export const Command: ICommand = {
  name: 'sudo',
  description: 'Do NOT touch me!',
  buildCommand: (builder) =>
    builder
      .addStringOption((option) =>
        option.setName('command').setDescription('What command to run?').setRequired(true),
      ),
  async execute(client, interaction) {
    const author = interaction.user.id
    const command = interaction.options.getString('command')!;
    if (admins.includes(author)) {
      if (command === "trigger") {
        await interaction.reply(':white_check_mark: Sending Notifications');
        await runNow();
        console.log("Sent!")

      } else {
        await interaction.reply(`:x: ${command.toString()}: command not found`);

      }
    } else {
      await interaction.reply(':x: Access Denied');
    }
  },
};
