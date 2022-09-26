import type { ICommand } from '../interfaces';
import { sequelize } from '../data/sql';

export const Command: ICommand = {
  name: 'register',
  description: 'Register to bot user with discord ID',
  async execute(client, interaction) {
    const user_id = interaction.user.id;
    const user_tag = interaction.user.tag;
    const [[user]] = await sequelize.query(`SELECT * FROM public.users WHERE id='${user_id}';`);
    // @ts-ignore
    if (user != undefined && user.id === user_id) {
      await interaction.reply(`Welcome back <@${user_id}>!`);
    } else {
      await sequelize.query(`INSERT INTO public.users (id, tag) VALUES ('${user_id}', '${user_tag}');`);
      await interaction.reply(`Welcome <@${user_id}>!`);
    }
  },
};
