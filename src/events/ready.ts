import { IEvent } from '../interfaces';
import {run} from "../jobs";

export const Event: IEvent = {
  event: 'ready',
  run: async (client) => {
    console.log('ready');
    await run(client)
  },
};

