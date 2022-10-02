import { Client, Collection, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { loadCommands, loadEvents } from './utils/modules';
import { ICommand } from './interfaces';
import { getEnv } from './env';

export default class Bot extends Client {
  public commands: Collection<string, ICommand> = new Collection();

  public async run() {
    const rest = new REST({ version: '10' }).setToken(getEnv('TOKEN'));

    this.commands = new Collection(await loadCommands());
    const body = this.commands.map((command) => {
      const builder = new SlashCommandBuilder().setName(command.name).setDescription(command.description);
      return (command.buildCommand ? command.buildCommand(builder) : builder).toJSON();
    });
    console.log(body);

    this.once('ready', async () => {
      await rest.put(Routes.applicationCommands(getEnv('CLIENT_ID')), { body });
      console.log('Started');
    });

    this.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commands.find((command) => command.name === interaction.commandName);
      if (!command) return;
      if (command.requirements) {
        for (let requirement of command.requirements) {
          if (!(await requirement(this, interaction))) return;
        }
      }

      await command.execute(this, interaction);
    });

    (await loadEvents()).forEach(([name, event]) => this.on(name, event.run));

    await this.login(getEnv('TOKEN'));
  }
}
