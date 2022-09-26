import { IEvent } from '../interfaces';

export const Event: IEvent = {
  event: 'ready',
  run: async (client) => {
    console.log('ready');
  },
};
