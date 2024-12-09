import { CommandInteraction, Message } from 'discord.js-selfbot-v13';
import { client } from '../../../index';

export class CommandError {
  private readonly message: Message;

  public constructor(message: Message) {
    this.message = message;
  }

  public async create(msg: string) {
    await this.message.reply({
      embeds: [
        {
          title: 'エラーが発生しました',
          description: msg,
          color: 'RED',
          footer: client.footer(),
        },
      ],
      allowedMentions: {
        parse: [],
      },
    });
  }
}
