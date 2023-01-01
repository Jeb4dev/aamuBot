import type { ICommand } from '../interfaces';
import { MorningService } from '../services/morning-service';

export const Command: ICommand = {
  name: 'get',
  description: 'List active morning notifications',
  async execute(client, interaction) {
    const author = interaction.user.id

    const morningService = new MorningService();

    // Save Morning Notification in DB
    let notifications = await morningService.getNotificationByAuthor(author)

    // toString the table of notifications
    let str: string = "";
    for (const e of notifications) {
      const a: string = await morningService.toString(e)
      str = str + a
    }

    // Send success msg to confirm notification subscription
    await interaction.reply(`Morning notifications you have subscribed:\n${str}END`);

  },
};
