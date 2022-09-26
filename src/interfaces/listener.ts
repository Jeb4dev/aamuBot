import type { Client, ClientEvents } from 'discord.js';

export interface IEvent {
  event: keyof ClientEvents;
  run: (client: Client, ...args: any) => Promise<void>;
}
