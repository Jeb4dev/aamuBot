import {ICommand} from "../interfaces";
import {MorningService} from "../services/morning-service";

export const Command: ICommand = {
  name: 'delete',
  description: 'List active morning notifications',
  buildCommand: (builder) =>
    builder
      .addStringOption((option) =>
        option.setName('id').setDescription('ID of the notification').setRequired(true),
      ),
  async execute(client, interaction) {
    const author = interaction.user.id
    const notif_id: number = Number(interaction.options.getString('id')!);

    const morningService = new MorningService();

    // Save Morning Notification in DB
    let notification = await morningService.getNotificationByID(notif_id)
    console.log(notification)
    if (notification && notification[0]?.from == author) {
      await morningService.deleteNotificationByID(notif_id)
      await interaction.reply(`Morning notification deleted by id ${notif_id}`);
    } else {
      await interaction.reply(`Error, cannot delete notification by id ${notif_id}. You have not created that notification or it has been deleted.`);
    }
  }
};
