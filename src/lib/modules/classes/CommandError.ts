import { CommandInteraction, Message } from 'discord.js-selfbot-v13';
import { client } from '../../../index';

export class CommandError {
  private readonly message: Message;

  public constructor(message: Message) {
    this.message = message;
  }

  public async create(msg: string) {
    await this.message.reply({
      content: '**エラーが発生しました**\n' + msg.split('\n').join('\n  '),
    });
  }
}
