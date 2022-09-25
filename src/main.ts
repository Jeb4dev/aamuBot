import { client } from './client';
import { initCommands } from './commands';
import { getEnv } from './env';

(async () => {
  await initCommands();
  await client.login(getEnv('TOKEN'));
})();
