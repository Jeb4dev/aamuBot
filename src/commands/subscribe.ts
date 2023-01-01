import type { ICommand } from '../interfaces';
import { MorningService } from '../services/morning-service';
import { CreateDate, MorningsLeft } from '../utils/time';

export const Command: ICommand = {
  name: 'subscribe',
  description: 'Subscribe morning notifications',
  buildCommand: (builder) =>
    builder
      .addUserOption((option) =>
        option.setName('user').setDescription('Who will be tagged in notifications?').setRequired(true),
      )
      .addStringOption((option) =>
        option.setName('date').setDescription('Until what day should person be notified. MM/DD/YYYY like 02/15/2023').setRequired(true),
      )
      .addStringOption((option) =>
        option.setName('customsg').setDescription('Custom morning message.').setRequired(false),
      ),
  async execute(client, interaction) {
    const author = interaction.user.id
    const channel = interaction.channelId
    const user = interaction.options.getUser('user')!;
    const date = interaction.options.getString('date')!;
    let customMsg = interaction.options.getString('customsg')!;

    // regex date validation in form of MM/DD/YYYY
    let regexDate = new RegExp('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$');

    if (regexDate.test(date)) {
      // Date validation was successful

      const morningService = new MorningService();

      const time = CreateDate(date)

      // Save Morning Notification in DB
      await morningService.create(author, user.id, time, customMsg, channel);

      // Send success msg to confirm notification subscription
      await interaction.reply(`<@${author}> subscribed notifications for ${user}. ${MorningsLeft(time)} mornings remaining.`);

    }
    else {
      // Date was in wrong format
      await interaction.reply(`Syntax for date **${date}** was incorrect. It should be **MM/DD/YYYY** like 02/15/2023.`);
    }

  },
};
