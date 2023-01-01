import * as fs from 'fs';
import * as path from 'path';
import type {ICommand, IEvent} from '../interfaces';


const loadModules = async <T, K>(
  directoryName: string,
  handleModule: (module: T) => [string, K],
): Promise<[string, K][]> => {
  return Promise.all(
    fs
      .readdirSync(path.join(__dirname, '..', directoryName))
      .filter(
        (filename) =>
          filename !== 'index.ts' && filename !== 'index.js' && (filename.endsWith('.ts') || filename.endsWith('.js')),
      )
      .map(async (filename) => handleModule(await import(path.join(__dirname, '..', directoryName, filename)))),
  );
};

export const loadCommands = () =>
  loadModules('commands', ({Command}: { Command: ICommand }) => [Command.name, Command]);

export const loadEvents = () => loadModules('events', ({Event}: { Event: IEvent }) => [Event.event, Event]);

