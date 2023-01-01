import { RepositoryService } from './index';
import {Notification} from '../entities/notifications';

export class MorningService extends RepositoryService<Notification> {
  constructor() {
    super(Notification);
  }

  async create(from: string, to: string, date: Date, customTxt: string, channel: string): Promise<Notification> {
    const notification = await this.repository.save(
      this.repository.create({
        from: from,
        to: to,
        date: date,
        customText: customTxt,
        channel: channel
      }),
    );

    return notification;
  }

  async getNotifications(): Promise<Notification[]> {
    return await this.repository.find();
  }

  async getNotificationByAuthor(id: string): Promise<Notification[]> {
    return await this.repository.findBy({from: id});
  }

  async getNotificationByID(_id: number): Promise<Notification[]> {
    return await this.repository.findBy({id: _id});
  }

  async deleteNotificationByID(_id: number) {
    const notif = await this.getNotificationByID(_id)
    if (notif != null) {
      await this.repository.remove(notif)
    }
  }

  async toString(notification: Notification): Promise<string> {
    return `\nID: ${notification.id}\nFROM: <@${notification.from}>\nTO: <@${notification.to}>\nUNTIL: ${notification.date}\nTXT: ${notification.customText}`
  }
}
